import { useEffect, useState } from "react"

function Projects({ formData, setFormData }) {
  const [projects, setProjects] = useState(
    formData.projects || []
  )

  const [technologyInputs, setTechnologyInputs] = useState({})

  // =====================================================
  // SYNC WITH BUILDER
  // =====================================================

  useEffect(() => {
    setProjects(formData.projects || [])
  }, [formData.projects])

  // =====================================================
  // UPDATE BUILDER
  // =====================================================

  const updateParent = (updatedProjects) => {
    setProjects(updatedProjects)

    setFormData((previous) => ({
      ...previous,
      projects: updatedProjects,
    }))
  }

  // =====================================================
  // ADD PROJECT
  // =====================================================

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
    }

    updateParent([
      ...projects,
      newProject,
    ])
  }

  // =====================================================
  // REMOVE PROJECT
  // =====================================================

  const removeProject = (id) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== id
    )

    updateParent(updatedProjects)

    setTechnologyInputs((previous) => {
      const updated = { ...previous }
      delete updated[id]
      return updated
    })
  }

  // =====================================================
  // UPDATE PROJECT
  // =====================================================

  const updateProject = (id, field, value) => {
    const updatedProjects = projects.map(
      (project) =>
        project.id === id
          ? {
              ...project,
              [field]: value,
            }
          : project
    )

    updateParent(updatedProjects)
  }

  // =====================================================
  // ADD TECHNOLOGY
  // =====================================================

  const addTechnology = (projectId) => {
    const input =
      technologyInputs[projectId]?.trim()

    if (!input) return

    const project = projects.find(
      (item) => item.id === projectId
    )

    if (!project) return

    const technologies =
      project.technologies || []

    const alreadyExists =
      technologies.some(
        (technology) =>
          technology.toLowerCase() ===
          input.toLowerCase()
      )

    if (alreadyExists) {
      setTechnologyInputs((previous) => ({
        ...previous,
        [projectId]: "",
      }))

      return
    }

    updateProject(
      projectId,
      "technologies",
      [...technologies, input]
    )

    setTechnologyInputs((previous) => ({
      ...previous,
      [projectId]: "",
    }))
  }

  // =====================================================
  // REMOVE TECHNOLOGY
  // =====================================================

  const removeTechnology = (
    projectId,
    technologyToRemove
  ) => {
    const project = projects.find(
      (item) => item.id === projectId
    )

    if (!project) return

    const technologies =
      project.technologies || []

    updateProject(
      projectId,
      "technologies",
      technologies.filter(
        (technology) =>
          technology !== technologyToRemove
      )
    )
  }

  // =====================================================
  // TECHNOLOGY KEYBOARD
  // =====================================================

  const handleTechnologyKeyDown = (
    event,
    projectId
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      addTechnology(projectId)
    }
  }

  // =====================================================
  // SHARED STYLES
  // =====================================================

  const inputClass = `
    h-12
    w-full
    rounded-xl
    border
    border-[#E2E8F0]
    bg-white
    px-4
    text-sm
    font-medium
    text-[#111827]
    outline-none
    transition-all
    duration-200
    placeholder:text-[#718096]
    hover:border-[#CBD5E1]
    focus:border-[#6366F1]
    focus:ring-4
    focus:ring-[#6366F1]/10
  `

  const labelClass = `
    mb-2
    block
    text-[12px]
    font-bold
    tracking-wide
    text-[#334155]
  `

  return (
    <section
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        bg-white
      "
    >
      {/* =====================================================
          HEADER — FIXED
      ====================================================== */}

      <div
        className="
          shrink-0
          border-b
          border-[#E2E8F0]
          bg-white
          px-6
          py-6
          sm:px-8
          sm:py-7
        "
      >
        <div className="flex items-start gap-4">

          {/* ICON */}

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#E0E7FF]
              bg-[#EEF2FF]
              text-[#6366F1]
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6M9 16h4"
              />
            </svg>
          </div>

          {/* HEADER TEXT */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6366F1]" />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#6366F1]
                "
              >
                Step 05
              </span>
            </div>

            <h2
              className="
                mt-1.5
                text-2xl
                font-black
                tracking-tight
                text-[#111827]
                sm:text-3xl
              "
            >
              Projects
            </h2>

            <p
              className="
                mt-1.5
                max-w-2xl
                text-sm
                leading-6
                text-[#718096]
              "
            >
              Showcase projects that demonstrate your skills,
              experience, and achievements.
            </p>

          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLLABLE CONTENT
      ====================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          bg-[#F8FAFC]
          px-5
          py-7
          sm:px-8
          sm:py-8
        "
      >
        <div className="mx-auto w-full max-w-[960px]">

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div className="mb-6">

            <div className="flex items-center gap-3">

              <h3
                className="
                  text-[15px]
                  font-black
                  tracking-tight
                  text-[#111827]
                "
              >
                Project portfolio
              </h3>

              <div className="h-px flex-1 bg-[#E2E8F0]" />

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-2.5
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#718096]
                "
              >
                Projects
              </span>

            </div>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#718096]
              "
            >
              Add projects that show what you can build and
              the technologies you know.
            </p>

          </div>

          {/* =================================================
              PROJECT LIST
          ================================================= */}

          <div className="space-y-6">

            {projects.map((project, index) => {

              const technologies =
                project.technologies || []

              return (
                <article
                  key={project.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#E2E8F0]
                    bg-white
                    shadow-[0_4px_18px_rgba(15,23,42,0.035)]
                    transition-all
                    duration-200
                    hover:border-[#CBD5E1]
                    hover:shadow-[0_6px_22px_rgba(15,23,42,0.05)]
                  "
                >

                  {/* =================================================
                      PROJECT HEADER
                  ================================================= */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-[#E2E8F0]
                      bg-white
                      px-5
                      py-4
                      sm:px-6
                    "
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#EEF2FF]
                          text-xs
                          font-black
                          text-[#6366F1]
                        "
                      >
                        {index + 1}
                      </span>

                      <div className="min-w-0">

                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-[#6366F1]
                          "
                        >
                          Project
                        </p>

                        <h3
                          className="
                            mt-0.5
                            truncate
                            text-base
                            font-black
                            text-[#111827]
                            sm:text-lg
                          "
                        >
                          {project.name ||
                            "New project"}
                        </h3>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeProject(project.id)
                      }
                      className="
                        shrink-0
                        rounded-xl
                        border
                        border-[#E2E8F0]
                        bg-white
                        px-3.5
                        py-2.5
                        text-[11px]
                        font-bold
                        text-[#718096]
                        transition-all
                        duration-200
                        hover:border-[#E0E7FF]
                        hover:bg-[#EEF2FF]
                        hover:text-[#4F46E5]
                      "
                    >
                      Remove
                    </button>

                  </div>

                  {/* =================================================
                      PROJECT CONTENT
                  ================================================= */}

                  <div
                    className="
                      bg-[#F8FAFC]
                      p-5
                      sm:p-6
                      lg:p-7
                    "
                  >

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                      {/* =================================================
                          PROJECT NAME
                      ================================================= */}

                      <div className="lg:col-span-2">

                        <label
                          htmlFor={`project-name-${project.id}`}
                          className={labelClass}
                        >
                          Project name
                        </label>

                        <input
                          id={`project-name-${project.id}`}
                          type="text"
                          value={
                            project.name || ""
                          }
                          onChange={(event) =>
                            updateProject(
                              project.id,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="e.g. BuildCV Resume Builder"
                          className={inputClass}
                        />

                      </div>

                      {/* =================================================
                          DESCRIPTION
                      ================================================= */}

                      <div className="lg:col-span-2">

                        <div className="mb-2 flex items-center justify-between">

                          <label
                            htmlFor={`project-description-${project.id}`}
                            className={labelClass.replace(
                              "mb-2",
                              ""
                            )}
                          >
                            Description
                          </label>

                          <span
                            className="
                              text-[10px]
                              font-semibold
                              text-[#718096]
                            "
                          >
                            Optional
                          </span>

                        </div>

                        <textarea
                          id={`project-description-${project.id}`}
                          rows={6}
                          value={
                            project.description ||
                            ""
                          }
                          maxLength={1000}
                          onChange={(event) =>
                            updateProject(
                              project.id,
                              "description",
                              event.target.value
                            )
                          }
                          placeholder="Explain what you built, what problem it solved, and what you achieved..."
                          className="
                            min-h-[170px]
                            w-full
                            resize-y
                            rounded-xl
                            border
                            border-[#E2E8F0]
                            bg-white
                            px-4
                            py-3.5
                            text-sm
                            leading-6
                            text-[#111827]
                            outline-none
                            transition-all
                            duration-200
                            placeholder:text-[#718096]
                            hover:border-[#CBD5E1]
                            focus:border-[#6366F1]
                            focus:ring-4
                            focus:ring-[#6366F1]/10
                          "
                        />

                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <p
                            className="
                              text-[11px]
                              text-[#718096]
                            "
                          >
                            Focus on the problem, your solution,
                            and the result.
                          </p>

                          <span
                            className="
                              shrink-0
                              text-[10px]
                              font-semibold
                              text-[#718096]
                            "
                          >
                            {project.description?.length ||
                              0}/1000
                          </span>

                        </div>

                      </div>

                      {/* =================================================
                          TECHNOLOGIES
                      ================================================= */}

                      <div className="lg:col-span-2">

                        <label
                          htmlFor={`technology-${project.id}`}
                          className={labelClass}
                        >
                          Technologies
                        </label>

                        <div
                          className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                          "
                        >

                          <input
                            id={`technology-${project.id}`}
                            type="text"
                            value={
                              technologyInputs[
                                project.id
                              ] || ""
                            }
                            onChange={(event) =>
                              setTechnologyInputs(
                                (previous) => ({
                                  ...previous,
                                  [project.id]:
                                    event.target.value,
                                })
                              )
                            }
                            onKeyDown={(event) =>
                              handleTechnologyKeyDown(
                                event,
                                project.id
                              )
                            }
                            placeholder="e.g. React"
                            className={`
                              ${inputClass}
                              sm:flex-1
                            `}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              addTechnology(
                                project.id
                              )
                            }
                            className="
                              h-12
                              shrink-0
                              rounded-xl
                              border
                              border-[#E0E7FF]
                              bg-[#EEF2FF]
                              px-6
                              text-sm
                              font-bold
                              text-[#4F46E5]
                              transition-all
                              duration-200
                              hover:border-[#6366F1]
                              hover:bg-[#E0E7FF]
                              focus:outline-none
                              focus:ring-4
                              focus:ring-[#6366F1]/10
                            "
                          >
                            Add
                          </button>

                        </div>

                        {/* TECHNOLOGY TAGS */}

                        {technologies.length > 0 && (
                          <div
                            className="
                              mt-4
                              flex
                              flex-wrap
                              gap-2
                            "
                          >

                            {technologies.map(
                              (technology) => (
                                <div
                                  key={technology}
                                  className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-[#E0E7FF]
                                    bg-[#EEF2FF]
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-[#4F46E5]
                                  "
                                >

                                  <span>
                                    {technology}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeTechnology(
                                        project.id,
                                        technology
                                      )
                                    }
                                    aria-label={`Remove ${technology}`}
                                    className="
                                      flex
                                      h-4
                                      w-4
                                      items-center
                                      justify-center
                                      rounded-full
                                      text-[#6366F1]
                                      transition-all
                                      duration-150
                                      hover:bg-[#6366F1]
                                      hover:text-white
                                    "
                                  >
                                    ×
                                  </button>

                                </div>
                              )
                            )}

                          </div>
                        )}

                        <p
                          className="
                            mt-2
                            text-[11px]
                            text-[#718096]
                          "
                        >
                          Press Enter or click Add to add a
                          technology.
                        </p>

                      </div>

                      {/* =================================================
                          PROJECT LINKS
                      ================================================= */}

                      <div>

                        <label
                          htmlFor={`live-url-${project.id}`}
                          className={labelClass}
                        >
                          Live demo URL
                        </label>

                        <input
                          id={`live-url-${project.id}`}
                          type="url"
                          value={
                            project.liveUrl || ""
                          }
                          onChange={(event) =>
                            updateProject(
                              project.id,
                              "liveUrl",
                              event.target.value
                            )
                          }
                          placeholder="https://example.com"
                          autoComplete="url"
                          className={inputClass}
                        />

                      </div>

                      {/* =================================================
                          GITHUB
                      ================================================= */}

                      <div>

                        <label
                          htmlFor={`github-url-${project.id}`}
                          className={labelClass}
                        >
                          GitHub URL
                        </label>

                        <input
                          id={`github-url-${project.id}`}
                          type="url"
                          value={
                            project.githubUrl || ""
                          }
                          onChange={(event) =>
                            updateProject(
                              project.id,
                              "githubUrl",
                              event.target.value
                            )
                          }
                          placeholder="https://github.com/username/project" 
                          autoComplete="url" 
                          className={inputClass} 
                        /> 
 
                      </div> 
 
                    </div> 
 
                  </div> 
 
                </article> 
              ) 
            })} 
 
          </div> 
 
          {/* ================================================= 
              EMPTY STATE 
          ================================================= */} 
 
          {projects.length === 0 && ( 
            <div 
              className=" 
                rounded-2xl 
                border 
                border-dashed 
                border-[#CBD5E1] 
                bg-white 
                px-6 
                py-14 
                text-center 
              " 
            > 
 
              <div 
                className=" 
                  mx-auto 
                  flex 
                  h-16 
                  w-16 
                  items-center 
                  justify-center 
                  rounded-2xl 
                  bg-[#EEF2FF] 
                  text-2xl 
                  font-black 
                  text-[#6366F1] 
                " 
              > 
                + 
              </div> 
 
              <h3 
                className=" 
                  mt-5 
                  text-lg 
                  font-black 
                  text-[#111827] 
                " 
              > 
                Add your projects 
              </h3> 
 
              <p 
                className=" 
                  mx-auto 
                  mt-2 
                  max-w-md 
                  text-sm 
                  leading-6 
                  text-[#718096] 
                " 
              > 
                Showcase personal, academic, freelance, or 
                professional projects. 
              </p> 
 
            </div> 
          )} 
 
          {/* ================================================= 
              ADD PROJECT BUTTON 
          ================================================= */} 
 
          <button 
            type="button" 
            onClick={addProject} 
            className=" 
              mt-6 
              flex 
              w-full 
              items-center 
              justify-center 
              gap-2.5 
              rounded-xl 
              border 
              border-dashed 
              border-[#C7D2FE] 
              bg-[#EEF2FF] 
              px-5 
              py-4 
              text-sm 
              font-bold 
              text-[#4F46E5] 
              transition-all 
              duration-200 
              hover:border-[#6366F1] 
              hover:bg-[#E0E7FF] 
              focus:outline-none 
              focus:ring-4 
              focus:ring-[#6366F1]/10 
            " 
          > 
 
            <span 
              className=" 
                flex 
                h-6 
                w-6 
                items-center 
                justify-center 
                rounded-full 
                bg-[#6366F1] 
                text-base 
                font-bold 
                leading-none 
                text-white 
              " 
            > 
              + 
            </span> 
 
            Add another project 
 
          </button> 
 
          {/* ================================================= 
              BOTTOM SPACE 
          ================================================= */} 
 
          <div className="h-4" /> 
 
        </div> 
      </div> 
    </section> 
  ) 
} 
 
export default Projects 
