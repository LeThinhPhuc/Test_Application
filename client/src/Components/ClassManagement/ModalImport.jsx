const ModalImport = ({ toggleModal, toggleModal2 }) => {
  return (
    <div className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed">
      <div
        onClick={toggleModal}
        className="w-screen h-screen top-0 left-0 bottom-0 right-0 fixed bg-black/70"
      ></div>
      <div className="p-4 w-full max-w-3xl max-h-full modal-content">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={toggleModal}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Supported files
            </h3>

            <p className="flex justify-evenly items-center">
              <div className="mb-5">
                <button onClick={toggleModal2}>
                  <img
                    width={200}
                    height={200}
                    src="data:image/png;base64,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"
                  />
                </button>
              </div>

              <div className="mb-5">
                <button onClick={toggleModal2}>
                  <img
                    width={250}
                    height={250}
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAA81BMVEX///8Aiivf4uf//P8AiiQSjkT//v/+/vucyagAhBoAfBcAii/+//sAgA+23MIAhiJYomsAhxgcikHj5+rk5eltsn75///e3+KczKjk4/Lf4+Pf4uudy7EAiCEAijAAexYAfCAAgy/t//Dq6++NwZrz//UAgiYAeyQAfhPf8uXJ6dJstn7I49Pl+OTQ5dG828CSzKWAvJJClVgAdgBvq3yp0bNstIQxl05dpmw3kU0OhDR9to5fpXUrkEak1bI1k1IghUTD6spYsnKQu5YAeCyc27DZ+uRAn2Ky377J9N7j/+1gong8n1275855v42UyJ2y1sFdiQhyAAAKF0lEQVR4nO2dCXvauhKG5ViR8QLCaaqkbWwMwY4hSwMtlEvJ0tueJDenS/7/r7kzNmvSspxTCjjztgFs4DH6PBqN5JHFGEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEFsIkoxIZJnw4Anx4EHIYSuJ3vxjbBWb+0fnzBnhb9yyRiGgTroevooBrud07O3541O87obWGb0rpBlDaDg8E+AAogTVuqFVvV9cTsoWbElpccBTcsXVvwrl0h62pVyKrVPrWq7+KFsWZbpuS4WXLMRePR90MBY8U9dGk7tpPWj0flPN4pjaZqelNokKIKGdiA2rC6gYaOLEyI5efBSoM3rg/ed8L5eyH3sffXz+bxpPin4E+z8xvmDxKsL9OzKQLc/cHRh7axw0HjZvCgHAdT1KEpP8mw2UIPEwQkh+q2eU6m/vYTKfl0OrBjOev+8Y5XPrgZg9WD/YeW03gKLvyqXYhNOu+Q8dfIanv55TWBTNRDqoNG72olKlmm6rseHRfHh3wJFH2kQ3y10fPQ8YubHlorOuu5sR7eQCN2d6505aX6+UYIZK9dgm88u1z9ATv7XpBx6l8EW1DYZH1d05aw2oFiGBgvZldkMVx1T/X4NuGf+jOTMP94EsbjZc/TZv3OjNLBl+yC3Pwc5+FQv0CJe+pQ1f2Av1Ge6DDQuj1fcMCxFA2e+MgmlG0U4+vaSyziL5Wgw77EVy5maZi23iHP8jtVpIBxDHIAGZtbahQU0UFBnnrsdYFyAGpSWWsLZrIMGZAekAWlAGpAGjDRAqG0kDRCqC6QBQhpkW4N5yaoGWv7g1esX0zhUyVXerGuwtbf3+udsbW29PmTsOWgwlb1BGs8z1mDrsD+QnFUNbHOWBm+2XvQPnlUNfNAAijnDDrLtD+xEg2lsvRhm9WVVg3zuzeupdoA1IeP+IH+XJvikWU5iSHo8eDbYYGs9NRik3Qye/LE8JFvj3PZhTwR/wy9xPvlVe4H8xPXVAP64O0xI0jCFIrmejomoUkrP81xXav7gK0EcW1YQDaTKSH9BRkHU7XYjK8IylbkbXPUa1Wr7thtw7nfetxuN3tAMgvP62dlZ7b9R3yKyoIEdxduNkzAMK7WzavJe0D7rFyq8K8vrEF/VAt6vCUcV3FbRyB9svgaRX1B4WRwTV9UVvHdUQDcOXgw83Y3lBt+YcvTkHSgwd4vwpuE8xOP+YMM1iDsh041Q6ejKa7FWjs+YoxLHbghx7vrue4Ze/7ObamC1GKYnH3vjdrDZPjHqObqR5MphQVumFjUwnRdTd2uhYj3N5zuhDqe+Hvfdwb1QhgjLWmY04FehELpQrc5O97p3eSy1o1PMYb78Ypnxl+JfZWggrW86VI7wS+o+m5hNwgpmdjQI6rpS+s2HGOdjSCuy5RXmcp+W0uRdC1y/bX5Pvvg+sX4zxzDFsigzowHvQc1nN19c7qeJujYvMsPQT0tQS3CKBuyAyqBgV3rqZXzKwF2EkTahwcb6RN+W5gNYNjsenlRf867AM+iqAYaQztHg4ALqGPKG0Dra3gd4abCWO0pt9mdqYIy/Wi8NoITBPWhQORrzkeDz0BCMeiey0iDI12QDm0Owf1szG4k7aI4lpm50XbA1uQM7VMEaK5Amq8yBtpGx0/NtCxUA27gwdOWwfWgZSnUBkcTN2DfAX0C/cWt3BPQUd8c3dw/F2vadbc27xWgoN/Lx3I/40Z0hFKigszB3BL0CsAOoDLrSz+KIdx38xg/TntBgxhjKm921HVO1+RMNoH5wLcgpnNGHNn+zI7EbCTGDYrqzLb02eESIJj175Fft/MGrvekabA3yk9dQA3nLVKqB7Y904EHzWzrF1WD/SxoAfgEaCPbRi5PLKfUjPj7bY5PHVKHuQyPQ9wcTU1hk7FcrUGxDsWri/UpnWIiCGZyiaA2plRfVIGXtNACOIECebBc0bDPhweqeO7qj9FoSIssf0EkQ4bsmfFyoC675i2qwpnaAhnCCJn9sTYqAs1c1Nz5gjuhHQ/IC/IDO/AZGB99KECjIRTR4wdZ4LM2sMl0Y99cm78/n4n4yWGaXy573NxR7EBHmawx6Ti8LED+x9uSsFTuf+7UG0Dbu7R6ytW0bkW5FB29XK8aul/QXuC+/RqYHwaEbQ6AAvemkwND+YelzNegrqPKjMRiMkcQUxg6+lhrINvSUdV19a3RuO427Y68c1yut3nYQdBvQqVZ6IfEHEf9qgMVUoH/F3sbaTA2Gw8uPDr6WGmilS/B2jug34DnTjjBGZCEUV0HHILxN7UAzTzFigJhBveQ/0WDaEY2Jl+unAeelc5z+7bDkNgcnednBywE4qgStgsHO+ye97OYwh0BB4xDJBTQwkLHNddQAI6LiiUqvAxmsErjfwbB10AOrSPg9GFaaJnQjsAt9F//EDja27zyqD1fVh1pYq9UPbiPtqJm7SUaSw9r+dTAIBGytdJ983SnKLGrAOTfNOM7n866HW67VbRaLzYvAgnf6Y8fQceo0qtVq7rz8WMEsaGDjgJGUPiJTSbjk3PPGP2ZrXLpALJ/cEyADGqRXCfCqopaedTsdVsPbnfiDkJjbEcdNX+NaNClBFjT416TtgjGF0cGzrcF8ZFkDqgtkB0m/cW8KW4fDbkNW5y/MM34gJsdQSlmb9z7XONJknurz1GBtx9L+pAYpWdUAry9MV2CNry/8Lg1m5uq+yXzuvm22Xr3encaTtjF7GlCMNEesvMb5B39MgxGkAWmAkAakAZJlDahtJA1IA9KANBhpQO0CaUAazJO3PiKrGixgB4YS4ofEtMisjSt7mLE3LTFthC6cpq3xq8xpECxwb+GwHYBojeUVby5+uwbc+1qcm2uTc+3oJmv3mE5yfuckmRkTVw21Wg0UaGAP567Pu9jGNJLslPnAWeVB23mSu/mHATsYTFG104V1/q0MMpKeOx+mDLp/Obpa8f2VldrJu/3FRzRt7jP4azjvvH85J+3qQ2joK9dAZ/X96vHth3JQsqQnH2dYLY5tLbROF+Z/shVXBvBHeBZwubmH/Ubva/ndfMsw/RLpFnQlpuVkDXDS+UErX47lCSDGyWX15e1OOYpNaXou7yeiJlOc4CG5U8Y0O9i8dXl+BWhx9jb3sdfcwRXpcEE6d2zuWt99ZlWDJIYdLUzIVOXmU+tHu3NxVIpjXKVt7EYpWdWA4YxOcBN4fx+lxHCdRsOogGF8Pm7ulAMLKon3C5eRCQ2SoC25h1G6jJ0arGU2WK2zAu4z1+6kaxfKx+4zExrMDa7od9lo33ZLsZk3B4u7cfMtW3E/8I+R+I30pVE7eTjHlR2hlphmnMx2ex44BroL8BkJyR7wGK3q3yfPxg4Yru2Kc791B52HGtwEDe8UsOJ+4J9DJc6SDVa4NRwjXQ9UrDr0JQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC+Of8HzQ4Gc/pAWx5AAAAAElFTkSuQmCC"
                  />
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImport;
