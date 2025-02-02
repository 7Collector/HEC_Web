import { Link } from "react-router-dom";
import TeamMemberFrame from '../components/TeamMember';
import { deputySecerateries, facultyAdvisor, jointSecerateries, Secretary } from "../dataset/team";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Team = () => {
    return (
        <>
          <div className="min-h-screen bg-[url('/main_bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="min-h-screen bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.8))]">
              <Navbar page={"Team"} />
              <h1 className="text-white text-5xl px-12 w-full h-[30vh] flex flex-col items-center justify-center">
                <span className="font-camica">Meet the Team</span>
                <span className="text-2xl mt-4 text-black">
                  Team work makes Dream Work
                </span>
              </h1>
            </div>
          </div>
          <div className="bg-black min-h-screen w-full flex-col gap-4 items-center">
            <div className="flex flex-wrap justify-evenly items-center">
            <div className="mt-8">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Secretary
                <div className="h-[2px] bg-red-600 mt-2 mb-4 w-[250px]" />
              </h1>
              <TeamMemberFrame
                name={Secretary.name}
                image={Secretary.image}
                large
              />
            </div>
            <div className="mt-12">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Faculty Advisor
                <div className="h-[2px] bg-red-600 mt-2 mb-4 w-[250px]" />
              </h1>
              <TeamMemberFrame
                name={facultyAdvisor.name}
                image={facultyAdvisor.image}
                large
              />
            </div>
            </div>
            <div className="mt-12">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Deputy Secretary
                <div className="h-[2px] bg-white mt-2 mb-4 w-[250px]" />
              </h1>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {
                  deputySecerateries.map((member) => (
                    <TeamMemberFrame
                      key={member.name}
                      name={member.name}
                      image={member.image}
                      large={false}
                    />
                  ))
                }
              </div>
            </div>
            <div className="mt-8">
              <h1 className="text-white text-3xl px-12 flex flex-col items-center justify-center">
                Joint Secretary
                <div className="h-[2px] bg-white mt-2 mb-4 w-[250px]" />
              </h1>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                {
                  jointSecerateries.map((member) => (
                    <TeamMemberFrame
                      key={member.name}
                      name={member.name}
                      image={member.image}
                      large={false}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          <Footer />
        </>
    );
}

export default Team;