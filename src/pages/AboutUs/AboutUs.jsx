import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title";
import pic from "../../assets/Charts.gif";

const AboutUs = () => {
  const title = {
    mainTitle: "About Us",
    subTitle: "",
  };

  return (
    <Container>
      <Helmet>
        <title>PanaPoll | About Us</title>
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center pt-16 pb-5 space-y-6">
        <Title title={title}></Title>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-6">
          {/* <p>      Welcome to PanaPoll, your trusted polling platform. At PanaPoll,
              we're dedicated to simplifying the polling process for businesses,
              organizations, and individuals alike. Our user-friendly interface
              allows you to create, share, and analyze polls effortlessly,
              empowering you to make informed decisions and drive meaningful
              conversations. Join us on our mission to democratize polling and
              amplify voices worldwide.
        Let's pollinate the world together!
          </p> */}

          <div className="w-full lg:w-[50%]">
            <img src={pic} alt="" className="w-full" />
          </div>

          <div className="w-full lg:w-[50%]">
            <p className="text-[#8b8b8b] text-justify leading-[30px]">
              Welcome to PanaPoll, your go-to destination for all your polling
              needs. At PanaPoll, we believe in the transformative potential of
              opinions and their ability to shape the world around us. Whether
              you're a business seeking valuable customer feedback, an
              organization aiming to engage your members, or an individual
              looking to understand public sentiment, PanaPoll provides you with
              the tools and resources to make informed decisions. Our passionate
              team is committed to innovation, continuously enhancing the user
              experience, introducing new features, and adapting to the evolving
              needs of our community.<br></br>
              <br></br> Our mission is straightforward: to democratize polling
              and ensure it's accessible to all. <br></br>
              <br></br>At PanaPoll, transparency, integrity, and privacy are our
              top priorities. We are dedicated to safeguarding your data and
              ensuring that your voice is heard without compromise. Our platform
              adheres to stringent standards of data security and privacy
              protection, allowing you to participate in polls with confidence,
              knowing that your information is safe.<br></br>
              <br></br>
              Join us on our mission to make polling more accessible,
              insightful, and impactful than ever before. Together, let's
              harness the power of opinions to create a brighter, more informed
              future for all.Thank you for choosing PanaPoll.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
