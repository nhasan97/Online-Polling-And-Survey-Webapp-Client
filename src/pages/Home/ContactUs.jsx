import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";

const ContactUs = () => {
  const title = {
    mainTitle: "Contact Us",
    subTitle: "We would love to hear you",
  };

  return (
    <Container>
      <Helmet>
        <title>PanaPoll | Contact Us</title>
      </Helmet>

      <div className="min-h-screen pt-16 pb-5 space-y-6">
        <Title title={title}></Title>

        <div className="w-[90%] flex flex-col justify-center items-center px-10 py-5 border rounded-lg">
          <form className="w-full flex flex-col gap-4 text-left">
            <div className="relative">
              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                <i className="fa-solid fa-t text-xl text-white"></i>
              </div>
              <input
                type="text"
                placeholder="Your Email"
                required
                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <div className="relative">
              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg"></div>
              <textarea
                type="email"
                placeholder="Message"
                required
                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
              />
            </div>

            <input
              type="submit"
              value="Send"
              className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
