const facultyAdvisor = {
    name: "Mr. XYZ",
    image: "/images/team/faculty.jpg",
    position: "Advisor",
    linkedin: "https://www.linkedin.com/in/xyz/",
};

const Secretary = {
    name: "Mr. Praveen Roj",
    image: "/secretary.jpg",
    position: "Secretary",
    linkedin: "https://www.linkedin.com/in/xyz/",
};

const deputySecerateries = Array.from({ length: 10 }).map(
    (_, i) => ({
        name: `Deputy Secretary ${i + 1}`,
        image: `/images/team/deputy_Secretary_${i + 1}.jpg`,
        position: "Deputy Secretary",
        linkedin: `https://www.linkedin.com/in/deputy_Secretary_${i + 1}/`,
    })
);

const jointSecerateries = Array.from({ length: 20 }).map(
    (_, i) => ({
        name: `Joint Secretary ${i + 1}`,
        image: `/images/team/joint_Secretary_${i + 1}.jpg`,
        position: "Joint Secretary",
        linkedin: `https://www.linkedin.com/in/joint_Secretary_${i + 1}/`,
    })
);

export {
    facultyAdvisor,
    Secretary,
    deputySecerateries,
    jointSecerateries,
};
