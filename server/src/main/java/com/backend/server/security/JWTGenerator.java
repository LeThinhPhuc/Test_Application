package com.backend.server.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JWTGenerator {

    private final Key key;

    public JWTGenerator() {
        //- Initialize the key using the secret string
        byte[] keyBytes = SecurityConstants.JWT_SECRET.getBytes();
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);

        //- Add custom claims (payload)
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
//        claims.put("customClaim", "customValue"); // Add custom claim


        String token = Jwts.builder()
                .setClaims(claims) // Set custom claims
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return token;
    }

    public String generateRefreshToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + SecurityConstants.REFRESH_TOKEN_EXPIRATION);

        //- Add custom claims (payload)
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        String refreshToken = Jwts.builder()
                .setClaims(claims) // Set custom claims
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        return refreshToken;
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public List<GrantedAuthority> getAuthoritiesFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        List<String> roles = (List<String>) claims.get("roles");

        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException e) {
            // Xử lý trường hợp chữ ký không hợp lệ
            throw new RuntimeException("Invalid JWT signature");
        } catch (MalformedJwtException e) {
            // Xử lý trường hợp JWT không đúng định dạng
            throw new RuntimeException("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            // Xử lý trường hợp JWT đã hết hạn
            throw new RuntimeException("Expired JWT token");
        } catch (UnsupportedJwtException e) {
            // Xử lý trường hợp JWT không được hỗ trợ
            throw new RuntimeException("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            // Xử lý trường hợp JWT có giá trị trống hoặc không hợp lệ
            throw new RuntimeException("JWT claims string is empty");
        }
    }
}
