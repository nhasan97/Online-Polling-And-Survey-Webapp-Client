import Container from "../../../components/shared/Container";
import useAllSurveys from "../../../hooks/useAllSurveys";

const OverView = () => {
  const [, , , filteredSurveys] = useAllSurveys();

  return (
    <Container>
      <div className="bg-[#FE7E51] w-full flex flex-col justify-center items-center mt-28 rounded-xl">
        {/* <Title title={title}></Title> */}

        <h1 className="text-left text-white text-4xl font-bold my-8">
          Overview
        </h1>
        <div className="w-full grid grid-cols-3 mb-8">
          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-8xl font-bold border-b-2 border-white">6</h1>
            <p className="text-2xl font-medium">Voters</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-8xl font-bold border-b-2 border-white">2</h1>
            <p className="text-2xl font-medium">Surveyors</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-8xl font-bold border-b-2 border-white">
              {filteredSurveys.length}
            </h1>
            <p className="text-2xl font-medium">Surveys</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverView;
