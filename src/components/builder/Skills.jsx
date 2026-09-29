import { useState } from "react"

function Skills({ formData, setFormData }) {
  const [skillInput, setSkillInput] = useState("")

  const skills = formData.skills || []

  // =====================================================
  // ADD SKILL
  // =====================================================

  const addSkill = () => {
    const newSkill = skillInput.trim()

    if (!newSkill) return

    const alreadyExists = skills.some(
      (skill) =>
        skill.toLowerCase() === newSkill.toLowerCase()
    )

    if (alreadyExists) {
      setSkillInput("")
      return
    }

    setFormData((previous) => ({
      ...previous,
      skills: [...(previous.skills || []), newSkill],
    }))

    setSkillInput("")
  }

  // =====================================================
  // REMOVE SKILL
  // =====================================================

  const removeSkill = (skillToRemove) => {
    setFormData((previous) => ({
      ...previous,
      skills: (previous.skills || []).filter(
        (skill) => skill !== skillToRemove
      ),
    }))
  }

  // =====================================================
  // ADD POPULAR SKILL
  // =====================================================

  const addPopularSkill = (skillToAdd) => {
    const alreadyExists = skills.some(
      (skill) =>
        skill.toLowerCase() === skillToAdd.toLowerCase()
    )

    if (alreadyExists) return

    setFormData((previous) => ({
      ...previous,
      skills: [...(previous.skills || []), skillToAdd],
    }))
  }

  // =====================================================
  // KEYBOARD
  // =====================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      addSkill()
    }
  }

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
          HEADER
      ====================================================== */}

      <div
        className="
          shrink-0
          border-b
          border-[#E2E8F0]
          bg-white
          px-5
          py-5
          sm:px-7
          sm:py-6
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
              rounded-lg
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
                d="M9 3h6"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 3v4l-5.5 9.5A3 3 0 0 0 7.1 21h9.8a3 3 0 0 0 2.6-4.5L14 7V3"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 14h8"
              />
            </svg>
          </div>

          {/* HEADER TEXT */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#6366F1]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#6366F1]
                "
              >
                Step 04
              </span>
            </div>

            <h2
              className="
                mt-1.5
                text-2xl
                font-bold
                tracking-tight
                text-[#111827]
                sm:text-3xl
              "
            >
              Skills
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-[#475569]
              "
            >
              Add the technical and professional skills that
              best represent your abilities and experience.
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
          p-5
          sm:p-7
        "
      >

        {/* =====================================================
            ADD SKILL
        ====================================================== */}

        <div>

          <div className="mb-4">

            <div className="flex items-center gap-3">

              <h3
                className="
                  text-sm
                  font-bold
                  text-[#111827]
                "
              >
                Add skills
              </h3>

              <div className="h-px flex-1 bg-[#E2E8F0]" />

              <span
                className="
                  rounded-full
                  bg-[#EEF2FF]
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-[#6366F1]
                "
              >
                {skills.length} added
              </span>

            </div>

            <p
              className="
                mt-1.5
                text-xs
                leading-5
                text-[#718096]
              "
            >
              Add skills one at a time. Press Enter for a
              quicker workflow.
            </p>

          </div>

          <div
            className="
              rounded-xl
              border
              border-[#E2E8F0]
              bg-[#F8FAFC]
              p-4
              sm:p-5
            "
          >

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                id="skillInput"
                type="text"
                value={skillInput}
                onChange={(event) =>
                  setSkillInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="e.g. React.js"
                className="
                  min-w-0
                  flex-1
                  rounded-lg
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-4
                  py-3
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
                "
              />

              <button
                type="button"
                onClick={addSkill}
                className="
                  shrink-0
                  rounded-lg
                  bg-[#6366F1]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#4F46E5]
                  focus:outline-none
                  focus:ring-4
                  focus:ring-[#6366F1]/20
                "
              >
                <span className="mr-1">
                  +
                </span>
                Add Skill
              </button>

            </div>

            <p
              className="
                mt-2.5
                text-xs
                text-[#718096]
              "
            >
              Press Enter or click Add Skill to add it.
            </p>

          </div>
        </div>

        {/* =====================================================
            YOUR SKILLS
        ====================================================== */}

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <h3
                className="
                  text-sm
                  font-bold
                  text-[#111827]
                "
              >
                Your skills
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#718096]
                "
              >
                These skills will appear on your resume.
              </p>

            </div>

            <span
              className="
                rounded-full
                border
                border-[#E2E8F0]
                bg-white
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-[#475569]
              "
            >
              {skills.length}{" "}
              {skills.length === 1 ? "skill" : "skills"}
            </span>

          </div>

          {skills.length > 0 ? (

            <div
              className="
                flex
                min-h-[110px]
                flex-wrap
                content-start
                gap-2
                rounded-xl
                border
                border-[#E2E8F0]
                bg-[#F8FAFC]
                p-4
                sm:p-5
              "
            >

              {skills.map((skill) => (

                <div
                  key={skill}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#E0E7FF]
                    bg-[#EEF2FF]
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    text-[#4F46E5]
                    transition-all
                    duration-200
                    hover:border-[#C7D2FE]
                    hover:bg-[#E0E7FF]
                  "
                >

                  <span>
                    {skill}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      text-sm
                      leading-none
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

              ))}

            </div>

          ) : (

            <div
              className="
                rounded-xl
                border
                border-dashed
                border-[#E2E8F0]
                bg-[#F8FAFC]
                px-6
                py-10
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#EEF2FF]
                  text-xl
                  font-semibold
                  text-[#6366F1]
                "
              >
                +
              </div>

              <h3
                className="
                  mt-4
                  text-lg
                  font-bold
                  text-[#111827]
                "
              >
                No skills added yet
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-[#475569]
                "
              >
                Add your technical and professional skills
                using the field above.
              </p>

            </div>
          )}

        </div>

        {/* =====================================================
            POPULAR SKILLS
        ====================================================== */}

        <div className="mt-8">

          <div className="mb-3">

            <h3
              className="
                text-sm
                font-bold
                text-[#111827]
              "
            >
              Popular skills
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-[#718096]
              "
            >
              Quickly add a commonly used skill.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {[
              "JavaScript",
              "React",
              "HTML",
              "CSS",
              "Tailwind CSS",
              "Python",
              "Git",
              "SQL",
            ].map((skill) => {

              const isAdded = skills.some(
                (item) =>
                  item.toLowerCase() === skill.toLowerCase()
              )

              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    addPopularSkill(skill)
                  }
                  disabled={isAdded}
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    transition-all
                    duration-200

                    ${isAdded
                      ? `
                          cursor-not-allowed
                          border-[#E0E7FF]
                          bg-[#EEF2FF]
                          text-[#6366F1]/50
                        `
                      : `
                          border-[#E2E8F0]
                          bg-white
                          text-[#475569]
                          hover:border-[#C7D2FE]
                          hover:bg-[#EEF2FF]
                          hover:text-[#6366F1]
                        `
                    }
                  `}
                >
                  {isAdded ? "✓ " : "+ "}
                  {skill}
                </button>
              )
            })}

          </div>
        </div>

        {/* =====================================================
            PROFESSIONAL TIP
        ====================================================== */}

        <div
          className="
            mt-8
            flex
            items-start
            gap-3
            rounded-lg
            border
            border-[#E0E7FF]
            bg-[#EEF2FF]
            px-4
            py-3.5
          "
        >

          <span
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#E0E7FF]
              text-[10px]
              font-bold
              text-[#6366F1]
            "
          >
            i
          </span>

          <div>

            <p
              className="
                text-xs
                font-semibold
                text-[#111827]
              "
            >
              Keep your skills relevant
            </p>

            <p
              className="
                mt-0.5
                text-xs
                leading-5
                text-[#475569]
              "
            >
              Focus on skills that match the job you are
              applying for. A focused list is more effective
              than adding every skill you know.
            </p>

          </div>

        </div>

        {/* BOTTOM SPACE */}

        <div className="h-2" />

      </div>
    </section>
  )
}

export default Skills
