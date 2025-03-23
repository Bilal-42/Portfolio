import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ProjectCard from './ProjectCard';

const Projects = ({ projects, isLoading, darkMode }) => {
  const onDragEnd = (result) => {
    // Handle drag end logic here if needed
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="projects" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {projects?.map((project, index) => (
                    <ProjectCard
                      key={project.id || index}
                      project={project}
                      index={index}
                      darkMode={darkMode}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </section>
  );
};

export default Projects;