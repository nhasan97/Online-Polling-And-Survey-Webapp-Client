import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import faqimg from "../../assets/FAQs-amico.png";

const FAQ = () => {
  const title = {
    mainTitle: "FAQ",
    subTitle: "Questions frequently asked by people",
  };
  return (
    <Container>
      <div className="w-full flex flex-col justify-center items-center gap-6 mt-28">
        <Title title={title}></Title>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-8">
          <div className="w-full md:w-[45%]">
            <img src={faqimg} alt="" className="w-full" />
          </div>

          <div className="w-full md:w-[55%] space-y-6">
            <div className="collapse collapse-arrow bg-[#101322] text-white">
              <input type="radio" name="my-accordion-2" checked="checked" />
              <div className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
                What are these surveys used for?
              </div>
              <div className="collapse-content">
                <p className="text-base">
                  They are used to provide researchers with reliable, usable,
                  primary data to inform business decisions.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#101322] text-white">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
                How will the surveys impact current affairs?
              </div>
              <div className="collapse-content">
                <p className="text-base">
                  Yes, surveys indeed play a crucial role in shaping current
                  affairs. They provide valuable data that can significantly
                  influence public opinion and policy decisions. For example,
                  political strategies or corporate decisions can be shaped
                  based on surveys that gauge public sentiment towards certain
                  issues.
                </p>
              </div>
            </div>
            <div className="collapse collapse-arrow bg-[#101322] text-white">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-lg md:text-xl lg:text-2xl font-medium">
                How can I become a pro user?
              </div>
              <div className="collapse-content">
                <p className="text-base">
                  Just click the pro link on the nav bar and follow the
                  instructions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
