import { useEffect, useState } from "react";
import "./Header.css"
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

const Header = () => {

    const [role, setRole] = useState("teacher")
    const navigate = useNavigate();

    const [name, setName] = useState("");

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const decoded = jwtDecode(token);
        const name = decoded.student === undefined ? (decoded.teacher.fullName) : decoded.student.name
       
        setName(name);

        }, []);

    const onLogOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <>
            {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b-2 border-black">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
                        <Link to="../student" className="flex items-center">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8XaOSLs/EAX+MAYeMAYOMAXeMAY+MAW+IRZuSFr/AAWeLt8/37/f/S3/nX5fr2+v6QtvLv9f2vyvXn7/ykvvLF1vejwvO90fbi6/t1nu0hbuVoletLhOjR3/lvmuyGqe8xdeY8e+d8pO5djuqat/Gfu/I6eueNrvC6zvXC1PYpcuZIf+evxvRUi+pkkutH1R2QAAASQklEQVR4nO1d2XbiOBDFsS2hZnPYErOaHcL2/383NhBiXIsWnOl+4D70mTMBoSuVSlWlUqlSeeGFF1544YUXXnjhhRdeeOGFF164oNGIoqjRitN/Go2yGuy22lmrpbTnjnb8tVqcxzNVS1Gt1mqetxlPk/Vnq+7WXrf/8bY4zYeeqFVF1mgwnC8H206r/heY1vvJeB+KIJBKKe8G5Sklg1CI4WG66nctmouavcV4Hwg/kDJtJdeglIEvvPn0GP8aFwTx6uD5wQ8zCCVDoWaLnQnLRv997IW69ny5X/R/ndkF9Y9DLWA689MrFfi1YdKPOHbxalwTps0JtW39Or/WNPBN+nPvVyC80RGfyqifbKqhTWteUB3vfnVN9pehtOrRBVJ4Z9ivyWJvNnmPUGLT+zWOrYOQ1j26kfSDwSTXVLwa+g70rhx9r/Mr/NqLqmOXrv2S1dnquotEu1PVld4VYvwL6/E4DJ/p04Wk700nlXg7cxaFO2S4KFtUB+KpQf/p2UzZ6RYCKtyUukG29kEJvbp2rZSRyhoSvfIIdqw2iP8Lqjoti2BP/G0yBPxlOYtxW84S/A0Eh3YJBAfVv82DgRy6uTEPM/gvE0wpzjmz1wT/7Br8RnB6jmDHYA2qzIdLHUWZuYrPL9msEZlrUff58PwMwZbPty4Dkbrhp+l0sd0OpqPTYe8JkTnFjuTS9oTab8bL6SjZJtPpMmtQZ+yL7RMM91zbmV/09hW38xq73Y2/VtOD1HYLskvJzUfbXdwtNNjqDTQ+Vm1S7LcxBqQlo6RQyYTcjaLJ+mRlWyt/s/1sk+3FvdTrpr88dNU2R1LLSLn80n79ZE5ReVpfoZsMySUTOC7F9pDoovRHequ3dbAxZZX60LYYrTyqSbFzYrgg2hPjpv7La2npIYmlXtTqSQ0fdDV0Md9aNbwxE9XVPtlvo4GnF/zKZIgPu++iTw/ocMmhgeLaKRcXV1UH+pmIRuhqVL5NdPaKPjoLwUbfUmPgageFM4PgRIKakcHAmuEJmwZ50C+WeO4e7lDyqO/ZCh1AZTuJTUwY5ExPcBc8FYSpGsxFgvUtSCwZTpF+Kk+/SWwJbXcfpEAzw/5BPxlnVN3YuYp1zCIR2nOD+pI3ZJUYxWtyV7uNwVD7M40Z0jvfLmzTQ3oqVrpvNYeshCpxyHbSdlLTfOxd90NdZCmqgxXDORwkNdN9qcNLqD/7/O7giA9tiZFu29giM1Cz0TUxstsL3Yb8xvqSUq5y3e5v2A+HY82iihCvJ9DKWA5buFTkUvOdATcvqrp81FKNVciJarDXKLUOnES9kOUAhVRJfjOOxpyODIZQAOpLbhqV0thOY6SL5lHwOnTSJR8O6c4YBanEAN1Hj5xWVT6/+XegstF8I49PKAK8fzLhlGg4o1ZwfcRMoxJvbCfhopDmMXDoN6mQ+3yfk7fagjGEdtwxlEi4Hx2Ab6qNsa8P3QrWJvpkQqo6n6h+YhSU4Ey4FhRTYboQ20Pw3SqjZ460HaPEWRuTXjEBHcHJHTRsxCfz8Txi0GXl0VtwjxZRVTWxpJrM0Z1gIjBQTAN+5f7gE8y/ojXpmj77DoYG4Y4U0ZkepPBEjm0P7E/GquYdjGlABgne6TUozsYLf03HQ4Mx1QpciGpjGK6B008K+Dvtzuvt5xz69HYTjIlut4HlpqQhw2Xx15QkjNo1OYNKGsSVcqiP6WgotURgQLZmKDVwsxjihnCPJBjsrSNDdC5ESJjE0EsXZkkoDTj7+FZ6JPvknxzi7CtyMfoj9AsJ0Bd6H/3KEGxQuHO5I/dqsbDnl+KTPLPyUSUJlalvliwVAecQ9Zz6lIiqmo2jlkeLpIiOGdzVQrNIRhsyRKynCaVFlXDPOquTLgoWaZ+AOTRk2AUMke0wpo5tlHomz7U9JinCzk/AZw0Z1iFDICPRjNi/DM7JWERUtE7BKEoTMlwb/Qi0FSRgSA21sg49A+AHE9k4Fz0HyNAwVNMCKgSswykRspD759NbKgNqFou5M1BKDRlCKS1atG9EH+Ts6RnMsCCUWPHUxFnTILvFI0Nqpy9lBjmKweOu1QcDbRipgTu+fPDSmkTgV+6fTU+6IyEoPm6LcD80PO1ueMCmGef+XCf2CTkraQYzLIh1IPKTBG0aQycfs0tzXgl6sJh+xt7W5kCdsqrcZgTj1sIws4b1LbATg+yXVcm3dohNQ81+Bhv6FqZHFyMYALl3f0fkLzy/D4Je4DtSLncGhr19Qw+Y8Upiwp/QxeAd0DjhVsX9kC8CwTa1N2S4gvvMLZ+nsUEJKuMwng3aG3TFq+A23F1eI3KARwLfhukUH9aq+YEBh7gwA21A4crjphWa0LrEPWUIJIg1JqhfYBVzYn72T3GgYpzibeNfA1GjQ4IF1OGwqWx46/g+4dunsuAE3/4UPcs+Hg8Xl0UDQ4LGh08NeHx4ieqPUYaSivZZE3yDFPEkbBVkmhv20jAQVcG2i8ykJTJ1yrHVLgRTisVZwO03eUhXKfyLeeL+G1AoqWXawiUGeG3PEEQoLlHl5r9hZw/m2Rhf8MsKS8/wLI57zAhCQYW73qU/fgvabMaqNNVhMElb4XlIT2WRYwQhxRa+K2424P/Z5Awh48bp7TIJQkHF9yikP4FFiAgqYhTuKeQMQUiRcqWKsEkURrJVMJg6K3YEoaAejAZcky7yCBgyRQmaxe6sCQKKXaPxtsqJqlDx3ocxK2MRogSBoBLm4iOqVhIFHSgEJbiEBEEwi4TJn4eSVr+MZ3k/oFbCTkgSfHsrmCe4Ls/DIl8oQwQTTgoI3U7QDAm+F49kW9qryLa3SqBp+ogyzFGGIDQwifjQT4ek5YVZ+s7TFf7zlVQYEUU6S4QX7rDaKzJoFDQ8jfplgsyB5W3IrW/ng4SMPIxDPi4EwRq8YcFn+Vtr9h0n9zWNjOp3Jqs1eEWD26QdNmd4epFrTnPfrwN8dXOCuIhesGNyIH2H+3nYnZIbNOHfDhJxMSVIiegFZ7JLxtlQeZC5Fl7IG4AdNOJiSJCNQ8SkWFlu9zdQ15zzRwcUQZaik4he8EYpm5pZFmQBMPR9BR+46NwjLhRFd4Kp8UYM+saFIJaxf2mNjfd06IiLliC7Bm/NEzFpx6A7rmvYoGSHi7joCJrEAvGbrZb31u7oY2LKrulOIeICKT4jopc+YZPobmFhgTzuYkoHRFyKFJ8lmNpaT4agHoAejIS0yAOCgOJTa/CCOubWGSaZQODKlIyvIQQLFJ9cgxnQIgFq7mYmozc10wEjgsAowQeKz4sodQbtGPSDBwNXVNHx/tJGXJ4XUdLjsYjn50GklXgBqk0bHxqKJYhoZUJZksIllyem7VJUJjQUSxBR9PLurUsuackrujgNYdVwFEshuCZ9VrV3YMj4m1Q9P5oi+ReLNVjpMh6wb69rJpyPT8W1aCIkQYsFNGLCwtYlFTRRb1zZcGuRgoVBSTusnkt0E7sOngPpQdlRtBBRPkxjfJnkB5qwviLuCdlRtBFRsuTRDdiNCRa6oxmyHoyFoFoRhAnBhTG3DHAiKTUFkFJhTtHGqSNMyHyH7BwMeru/IySXthlFmzVocrxmnPJ1BcwZA2BisCYUrUSUSmvNw6poBJacCkGfFJgIqtUMGh1zW9U2gRcSMDClMrQU7QIreEZdccRtwlEGR8Aef7GYp2i3Bitbo+5YRYVhYhuKkN6DWEG1W4OVL7MyuFbWNxKzw31rWjA4ipY1qwwrTNpcF2gjX0cpqoAx6SmKliLawPOFsEpd5udPTbhXhEQC3Z7pLk7RUkSJg1GxXsA7E+ZhU3jdJnV68XRdrlAxLqiW4Wn8Z+UYKTjC1LYoAqmpsaXiNty9bYyiJcEJXnZDxki1LmVQEvAGuN9nV1SR1Xn5E5fdVqRouQYrXeJWyRG7nmWerwwLTnjVrGd4pZ37DQ89xT+2a5C4VHI1GGHKj7GPGMNleD0UxSsns+UUG/njNtsZJJK8PXVpB6ZBG0fcYJr3zVzAc65TilzP+39uh8J/jraxd+Jy1y3AACPWxl4wVKXfqZtNPEFDsiWoov7H+/v72uh1qwcQN0n95PrnGKaym6acIDcXv8MyH/iPBnQloAsakUMW3Br/Lfl9fau9L/7pmQo8dy+CuKceuh0ccCBK+ucy9IBtyZWzegBSavxHB85xR4YtPOaCT3wjVOIn6wIq05qZKoMhkfxWStwnc63YQoEqcpfffZGboIYVeODA5Q8qdoSz9q0ASsHE5NwLhlpMK/CAGzOPuZvkZflS7s9c0CReVni0y+BYG3oXEayL8ahHiH3Yq5VFsUnUgCtU5HKuqaCtwBNRNzz4Uo7GmFBvYxTsQ3h4ZJiyAGOlRceLKqtQzlrsUwSLEQWEoWt9GhBshebEdyee3zS+qKx8UIvauXoLMocJ6AZVyOxpijuqoDSs9+VcgQepogRVCPlKkm9eLRFDj5pBJJiAVFFyrhOVwE9Re4YXGLwuQIJ8AQ0r6e/MEKnAg1md5BsPcuh8IWpKtokV94Fxa1OGhuVLyZJV0rBuKfhhsiq/Qu8awFiUaY0h+AN43tiSOqAyeqYCoDunNDRRIg3mw5hW4AH3b4ioKFV9xHOy4Jrk2ztK4TIBz71N89uA94QLSRaOpimOLPXNkazWqyTRb8R7Mox0IXVBiYUVEd5iinBuVYogoUsJkw4DPF1xr8BDWkNtqrpgqm+U+RXM9oHOQyDXFlKfxjRbAeoo+mguYp7mMjbE+/TrSUy1XrhZGEeiYGkbZnAaZLXK7HUvo3XxRhfM5p5IgAEz49QvOP1eld7EGyc6q0F6ekmtM+97KY/ZWeE5ivE5NxL49ZmH3xrM8zlKG77ZecwNMq5UaBs6WZRChIBqmE/lII2tFCH72khjyuRE8OYf8tgPmYpm8mXu6QDGRs0GJ1iRi7jPvYYd8GUK4b1gi/PDFvxdzSJecU9x+HN8eBoL7vFNzWs6sMqqVSo0jFLoXhhkH51VYot8u0+89HcF+/BDBU1VDC0MfuROly4EMmE0RjqN+6Jhwr7Aon9lEb1saXG2Bc/XvHxkH/9N7jGdtMvTB7XRU2zKjtbRQzL57O6RIqdo2hcG2+yDSF7g/SyTCWOlZcMR6p4dwC7na5/cegCWQFvTHgpwu0YKf3jd/+MzbcRcxmKoNdqxAgvKhiA6RgapDj3+EWAlxpNKPfH5PDyDlz+wIhm22fpYjrBB3Sv24acUMlwONU8hV/VVGNG7sra3u9DKHwYhbc4PunLU/Nng+AhGgj2Hogr4bYSaQSwLfUPTFOFB740gjoHnUmwFz4M2KeTp9lbutfmFfkub4DmEpsVZfxARp9lTfR/iA/u4IQkZGBz/dYiCnw51Mai0i7mBV/uurXkEocTJoGUiXVjaT2GFvOwnw7V+Glsz20eBVWCwxidzqpK5UwVO6vaaEhu95x5RtfEJUP5HHt0pJf1h4kKQSmPLOPonvYXU15YLy7eojyDHCWnKOtdvJNLYMkihElYwov5Ke7Eoj2RX52Q/+phX6Tut7mW5EC/zB0H1sOjEcPAa9dbHYuwLjelSgBS12WA1Qdqr1PtvZ8WpLqen42/ASwffxy4Qwey8eD/2J80Mk/5xtThtPOHbsftuTgZCzsaDbe/e3m6djA6eCKiT/evgzN0JVipnnUpMuxWk83VFSo3vjJ6lShsMRXhtz0//Q9vekyX9meOlfwTUwZQxIjwP+Z/BE1rmG3WdN/BXoWruD4Td0aWPl/46lOFTchrQL4X9bTz3AloOjaWdBfZ/QT75AloeCypR6W/Cn5X5tM1XSfpGSTdrAGmp1IzdFG3mlM+8V6Ec9bd7N//4EcGwpCWYgyZKracnxXCVmR9RZ1x7UndJMXCs0MYiSriH0HX8wnD5E2hoLZQmaMq2JcblqZhHxOfQafBVEBx6hRDF59nznWxYaeKAuyMbfMtuKV+Mt9iY1z/OnrAkmbozp89SXn2h0e4Nq6bqUKUdqo17tO0ffQ5UNTSWVynE4rfk8wGTZBaEusHPvD21SfraAW/1Tp6fNqdrL/C90e6Xpy/frffTPnN0iatJgQhny+2XqeMWNdejuSKdQSXD6nC80A9WyWjHx8VpH9aEn/q9gZRXl1VUq8PTYrXDwhEsGt1JLznP/JoQfvjdYOiLqhiOp+tmiW8rWvarEfePx9VqNRgs0n+Pn5Nu45mhbjTara/jerVKBoNkteodP+Po/566F1544YUXXnjhhRdeeOGFF1544Z/Ef1M7OMxhFEdqAAAAAElFTkSuQmCC" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                <div className="font-bold">
                                    TEST <span className="text-rose-600">APPLICATION</span>
                                </div>
                            </span>
                        </Link>

                        {role === 'student' && (
                            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    <li>
                                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Exams</a>
                                    </li>

                                    <li>
                                        <a href="#" className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white" aria-current="page">Profile</a>
                                    </li>

                                </ul>
                            </div>
                        )}

                        <div className="flex items-center lg:order-2">
                            <a onClick={onLogOut} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 border-4 border-red-500 dark:border-red-700 rounded-3xl">
                                Hi, {name} <span style={{ fontSize: "large" }}>👋</span>
                            </a>

                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
};

export default Header;
