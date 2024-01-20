import { useQuery } from "@tanstack/react-query";
import { getSurvey } from "../../api/surveyAPIs";
import { saveSurveyResponse } from "../../api/responseAPIs";
import { useParams } from "react-router-dom";
import Container from "../../components/shared/Container";
import { Helmet } from "react-helmet-async";
import Title from "../../components/shared/Title";
import Loading from "../../components/shared/Loading";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useResponse from "../../hooks/useResponse";
import usePerformMutation from "../../hooks/usePerformMutation";
import { saveSurveyPreference } from "../../api/prefernceAPIs";
import usePreference from "../../hooks/usePreference";
import useUserRole from "../../hooks/useUserRole";
import { useEffect, useState } from "react";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { saveSurveyComment } from "../../api/commentAPIs";
import useComments from "../../hooks/useComments";
import CommentCard from "./commentCard";
import ChartBar from "../../components/shared/ChartBar";

const SurveyDetails = () => {
  //setting the title
  const title = {
    mainTitle: "Survey Details",
    subTitle: "Your thoughts...Our drive | Your voice matters",
  };

  const today = useCurrentDate();

  const _id = useParams();

  //fetching the data of the particular survey
  const { isLoading, data: survey } = useQuery({
    queryKey: ["getSingleSurveyData"],
    queryFn: () => getSurvey(_id),
  });

  const [user, loading, role, roleLoading, roleFetched] = useUserRole();

  const [yes, setYes] = useState([]);
  const [no, setNo] = useState([]);

  const [
    responses,
    loadingResponses,
    isFetched,
    refetch,
    filteredYes,
    filteredNo,
  ] = useResponse(_id);

  useEffect(() => {
    setYes(filteredYes);
    setNo(filteredNo);
  }, [responses]);

  // console.log(yes.length, no.length);

  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  const [
    preferences,
    loadingPreferences,
    preferencesRefetch,
    filteredLikes,
    filteredDislikes,
  ] = usePreference(_id);

  useEffect(() => {
    setLikes(filteredLikes);
    setDislikes(filteredDislikes);
  }, [preferences]);

  const [loadingComments, fetchedComments, refetchComments] = useComments(_id);

  //==================================== Like/Dislike ====================================

  //testing if the person logged in already gave feedback or not
  let feedbackExists;
  if (!loadingPreferences) {
    feedbackExists = preferences.find(
      (preference) => preference?.participantsEmail === user?.email
    );
  }

  //saving ike/dislike in db
  const mutation1 = usePerformMutation(
    "savePreference",
    saveSurveyPreference,
    "Thanks for your feedback!"
  );

  //like/dislike btn handler
  const handleLikeAndDislike = (action) => {
    const response = {
      surveyID: survey?._id || "Not Found",
      surveyorEmail: survey?.email || "Not Found",
      participantsName: user?.displayName || "Not Found",
      participantsEmail: user?.email || "Not Found",
      action: action || "Not Found",
      timeStamp: Date.now(),
    };
    mutation1.mutate(response);
    preferencesRefetch();
  };

  //==================================== Vote ====================================

  //testing if the person logged in already voted or not
  let alreadyVoted;
  if (isFetched) {
    alreadyVoted = responses.find(
      (response) => response?.votersEmail === user?.email
    );
  }

  //saving response in db
  const mutation2 = usePerformMutation(
    "saveResponse",
    saveSurveyResponse,
    "Inserted successfully!"
  );

  //submit btn handler
  const handleVote = (e) => {
    e.preventDefault();

    const response = {
      surveyID: survey?._id || "Not Found",
      surveyorEmail: survey?.email || "Not Found",
      votersName: user?.displayName || "Not Found",
      votersEmail: user?.email || "Not Found",
      vote: e.target.rad.value || "Not Found",
      timeStamp: Date.now(),
    };
    mutation2.mutate(response);
    refetch();
  };

  //==================================== Comment ====================================

  //saving comment in db
  const mutation3 = usePerformMutation(
    "saveComment",
    saveSurveyComment,
    "Comment Posted successfully!"
  );

  const handleComment = (e) => {
    e.preventDefault();

    const comment = {
      surveyID: survey?._id || "Not Found",
      surveyorEmail: survey?.email || "Not Found",
      commenterName: user?.displayName || "Not Found",
      commenterEmail: user?.email || "Not Found",
      commenterImage: user?.photoURL || "Not Found",
      comment: e.target.comment.value || "Not Found",
      timeStamp: Date.now(),
    };
    mutation3.mutate(comment);
    refetchComments();
  };

  if (
    isLoading ||
    loading ||
    loadingResponses ||
    loadingPreferences ||
    roleLoading ||
    loadingComments
  ) {
    return <Loading></Loading>;
  }

  const deadlinePassed = dateComparer(today, survey.deadline);
  return (
    <Container>
      <Helmet>
        <title>PanaPoll | Survey Details</title>
      </Helmet>

      <div className="min-h-screen pt-16 pb-5 ">
        <Title title={title}></Title>
        <div className="flex justify-center items-center gap-6 my-10">
          <div className="w-[50%] flex flex-col justify-center items-center gap-6">
            <div className="w-full p-6 space-y-4 border rounded-lg">
              <h2 className="card-title text-[#71357B] text-2xl">
                {survey?.title}
              </h2>
              <div className="badge bg-[#95D0D4] text-white text-base font-medium">
                {survey?.category}
              </div>
              <p className="text-[#8b8b8b] text-justify">
                {survey?.description}
              </p>

              <h3 className="text-[#8b8b8b] text-justify">
                <span className="text-[#101322] font-medium">Created On: </span>
                {timeStampToDateConverter(survey?.timeStamp)}
              </h3>

              <h3 className="text-[#8b8b8b] text-justify">
                <span className="text-[#101322] font-medium">Expires On: </span>
                {survey?.deadline}
              </h3>

              {!feedbackExists ? (
                <div className="join">
                  <button
                    className="btn join-item text-xl w-full"
                    onClick={() => handleLikeAndDislike("like")}
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span>{likes.length}</span>
                  </button>

                  <button
                    className="btn join-item text-xl w-full"
                    onClick={() => handleLikeAndDislike("dislike")}
                  >
                    <i className="fa-solid fa-thumbs-down"></i>
                    <span>{dislikes.length}</span>
                  </button>
                </div>
              ) : (
                <div className="join">
                  <button
                    className="btn join-item text-xl w-full"
                    onClick={() => handleLikeAndDislike("like")}
                    disabled
                  >
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span>{likes.length}</span>
                  </button>

                  <button
                    className="btn join-item text-xl w-full"
                    onClick={() => handleLikeAndDislike("dislike")}
                    disabled
                  >
                    <i className="fa-solid fa-thumbs-down"></i>
                    <span>{dislikes.length}</span>
                  </button>
                </div>
              )}
            </div>

            {deadlinePassed === "valid" ? (
              <fieldset className="w-full p-6 space-y-4 border rounded-lg">
                <legend className="text-[#8b8b8b] text-base">
                  Let us know your thought
                </legend>
                <form onSubmit={handleVote}>
                  <div className="w-full flex ">
                    <div className="flex-1 flex items-center text-xl">
                      <input
                        type="radio"
                        name="rad"
                        id="rad1"
                        value="Yes"
                        required
                        className="radio radio-error"
                      />
                      <label htmlFor="rad1" className="ml-3">
                        Yes
                      </label>
                    </div>
                    <div className="flex-1 flex items-center text-xl">
                      <input
                        type="radio"
                        name="rad"
                        id="rad2"
                        value="No"
                        required
                        className="radio radio-error"
                      />
                      <label htmlFor="rad2" className="ml-3">
                        No
                      </label>
                    </div>
                  </div>

                  {roleFetched &&
                  (role === "user" || role === "pro-user") &&
                  !alreadyVoted ? (
                    <input
                      type="submit"
                      value="Submit"
                      className="w-full btn mt-5 bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
                    />
                  ) : (
                    <input
                      type="submit"
                      value="Submit"
                      disabled
                      className="w-full btn mt-5 bg-[#FE7E51] hover:bg-white text-lg text-white hover:text-[#FE7E51] border-none"
                    />
                  )}
                </form>

                {roleFetched && role === "pro-user" ? (
                  <form onSubmit={handleComment}>
                    <div className="relative">
                      <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                        <i className="fa-solid fa-comment text-xl text-white"></i>
                      </div>
                      <input
                        type="text"
                        name="comment"
                        placeholder="Comment"
                        required
                        className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                      />

                      <button
                        type="submit"
                        className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 right-0 bg-transparent"
                      >
                        <i className="fa-solid fa-paper-plane text-xl"></i>
                      </button>
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </fieldset>
            ) : (
              <div className="w-full p-6 space-y-4 border border-red-600 rounded-lg">
                <p className="text-red-600">Survey expired</p>
              </div>
            )}
          </div>

          <div className="w-[50%] h-full flex flex-col justify-center items-center gap-6">
            {/* <div className="w-full p-6 border rounded-lg">
              <ChartBar yes={yes.length} no={no.length}></ChartBar>
            </div> */}

            <div className="w-full h-[50%] p-2 border-2 rounded-xl">
              <ChartBar yes={yes.length} no={no.length}></ChartBar>
            </div>

            <div className="w-full h-[300px] p-6 space-y-4 border rounded-lg overflow-y-auto">
              {fetchedComments.map((coment) => (
                <CommentCard key={coment._id} coment={coment}></CommentCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SurveyDetails;
