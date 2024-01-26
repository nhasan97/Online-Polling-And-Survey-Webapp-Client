import Container from "../../../components/shared/Container";
import useAllSurveys from "../../../hooks/useAllSurveys";

const OverView = () => {
  const [, , , filteredSurveys] = useAllSurveys();

  let valueDisplays = document.querySelectorAll(".num");
  let interval = 5000;

  valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
      startValue += 1;
      valueDisplay.textContent = startValue;
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });

  return (
    <Container>
      <div className="bg-[#FE7E51] w-full flex flex-col justify-center items-center mt-28 rounded-xl">
        {/* <Title title={title}></Title> */}

        <h1 className="text-left text-white text-4xl font-bold my-8">
          Overview
        </h1>
        <div className="w-full grid grid-cols-3 mb-8">
          <div className="flex flex-col items-center justify-center gap-3 text-white border-r border-white">
            <h1
              className="text-3xl md:text-5xl lg:text-8xl font-bold border-b-2 border-white num"
              data-val="6"
            >
              6
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium">Voters</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <h1
              className="text-3xl md:text-5xl lg:text-8xl font-bold border-b-2 border-white num"
              data-val="2"
            >
              2
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Surveyors
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-white border-l border-white">
            <h1
              className="text-3xl md:text-5xl lg:text-8xl font-bold border-b-2 border-white num"
              data-val="13"
            >
              {filteredSurveys.length}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              Surveys
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverView;
