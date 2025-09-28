import React from "react";

const topics = [
  {
    title: "Physics",
    enabled: true,
    subtopics: [
      {
        title: "Classical Mechanics",
        enabled: true,
        subtopics: [
          {
            title: "Newton's Laws",
            enabled: true,
            subtopics: [
              { title: "Law of Inertia", enabled: true, subtopics: [] },
              { title: "F=ma", enabled: true, subtopics: [] },
              { title: "Action-Reaction", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Work and Energy",
            enabled: true,
            subtopics: [
              { title: "Kinetic Energy", enabled: true, subtopics: [] },
              { title: "Potential Energy", enabled: true, subtopics: [] },
              { title: "Conservation of Energy", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
      {
        title: "Electromagnetism",
        enabled: true,
        subtopics: [
          {
            title: "Electric Fields",
            enabled: true,
            subtopics: [
              { title: "Coulomb's Law", enabled: true, subtopics: [] },
              { title: "Electric Potential", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Magnetic Fields",
            enabled: true,
            subtopics: [
              { title: "Ampere's Law", enabled: true, subtopics: [] },
              { title: "Faraday's Law", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Mathematics",
    enabled: true,
    subtopics: [
      {
        title: "Algebra",
        enabled: true,
        subtopics: [
          {
            title: "Equations",
            enabled: true,
            subtopics: [
              { title: "Linear Equations", enabled: true, subtopics: [] },
              { title: "Quadratic Equations", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Polynomials",
            enabled: true,
            subtopics: [
              { title: "Factorization", enabled: true, subtopics: [] },
              { title: "Roots of Polynomials", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
      {
        title: "Calculus",
        enabled: true,
        subtopics: [
          {
            title: "Differentiation",
            enabled: true,
            subtopics: [
              { title: "Rules of Derivatives", enabled: true, subtopics: [] },
              { title: "Applications", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Integration",
            enabled: true,
            subtopics: [
              { title: "Definite Integrals", enabled: true, subtopics: [] },
              { title: "Indefinite Integrals", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Computer Science",
    enabled: true,
    subtopics: [
      {
        title: "Programming",
        enabled: true,
        subtopics: [
          {
            title: "JavaScript",
            enabled: true,
            subtopics: [
              { title: "Variables & Types", enabled: true, subtopics: [] },
              { title: "Functions", enabled: true, subtopics: [] },
              { title: "Async Programming", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Python",
            enabled: true,
            subtopics: [
              { title: "Syntax Basics", enabled: true, subtopics: [
                { title: "Variables & Types", enabled: true, subtopics: [] },
                { title: "Functions", enabled: true, subtopics: [] },
                { title: "Async Programming", enabled: true, subtopics: [] },
              ] },
              { title: "OOP in Python", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
      {
        title: "Data Structures",
        enabled: true,
        subtopics: [
          {
            title: "Trees",
            enabled: true,
            subtopics: [
              { title: "Binary Trees", enabled: true, subtopics: [] },
              { title: "AVL Trees", enabled: true, subtopics: [] },
            ],
          },
          {
            title: "Graphs",
            enabled: true,
            subtopics: [
              { title: "Graph Traversal", enabled: true, subtopics: [] },
              { title: "Shortest Path", enabled: true, subtopics: [] },
            ],
          },
        ],
      },
    ],
  },
];

interface Topic {
  title: string;
  enabled: boolean;
  subtopics: Topic[];
}

const SubtopicsList = ({ subtopics }: { subtopics: Topic[]}) => {
  const [subtopicsTree, setSubtopicsTree] = React.useState<Topic[]>(subtopics);

  const handleToggle = (subtopic: Topic) => {
    const newSubtopicsTree = subtopicsTree.map((topic) =>
      topic.title === subtopic.title
        ? { ...topic, enabled: !topic.enabled } // Thats it, compare subntopic and topic title and reset the enabled value ~~
        : topic
    );

    setSubtopicsTree(newSubtopicsTree);
  };

  return (
    <ul>
      {subtopicsTree.map((subtopic) => (
        <li key={subtopic.title}>
          <div onClick={() => handleToggle(subtopic)}>
            {subtopic.subtopics.length > 0 && <span>{subtopic.enabled ? ' [-] ' : ' [+] '}</span>}
            <span>{subtopic.title}- ({subtopic.subtopics.length})</span>
          </div>
          {subtopic.subtopics.length > 0 && subtopic.enabled && (
            <SubtopicsList subtopics={subtopic.subtopics} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default function RecursiveListDemo() {
  return (
    <div>
      <h4>Recursive List Demo - Iterate `SubtopicsList` itself ~</h4>
      <p>Pre-condition: data structure must be same ~</p>
      {topics.length > 0 && <SubtopicsList subtopics={topics} />}
    </div>
  );
};
