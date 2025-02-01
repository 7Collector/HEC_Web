const facultyAdvisor = {
    name: "Mr. XYZ",
    image: "/images/team/faculty.jpg",
    position: "Advisor",
    linkedin: "https://www.linkedin.com/in/xyz/",
};

const seceratery = {
    name: "Mr. XYZ",
    image: "/images/team/secertary.jpg",
    position: "Seceratery",
    linkedin: "https://www.linkedin.com/in/xyz/",
};

const deputySecerateries = Array.from({ length: 8 }).map(
    (_, i) => ({
        name: `Deputy Seceratery ${i + 1}`,
        image: `/images/team/deputy_seceratery_${i + 1}.jpg`,
        position: "Deputy Seceratery",
        linkedin: `https://www.linkedin.com/in/deputy_seceratery_${i + 1}/`,
    })
);

const jointSecerateries = Array.from({ length: 12 }).map(
    (_, i) => ({
        name: `Joint Seceratery ${i + 1}`,
        image: `/images/team/joint_seceratery_${i + 1}.jpg`,
        position: "Joint Seceratery",
        linkedin: `https://www.linkedin.com/in/joint_seceratery_${i + 1}/`,
    })
);

export {
    facultyAdvisor,
    seceratery,
    deputySecerateries,
    jointSecerateries,
};
