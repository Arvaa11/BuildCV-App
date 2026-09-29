import { useEffect, useState } from "react"

function Experience({ formData, setFormData }) {
  const [experiences, setExperiences] = useState(
    formData.experience || []
  )

  // =====================================================
  // SYNC WITH BUILDER
  // =====================================================

  useEffect(() => {
    setExperiences(formData.experience || [])
  }, [formData.experience])

  // =====================================================
  // UPDATE PARENT FORM DATA
  // =====================================================

  const updateFormData = (updatedExperiences) => {
    setExperiences(updatedExperiences)

    setFormData((previous) => ({
      ...previous,
      experience: updatedExperiences,
    }))
  }

  // =====================================================
  // ADD EXPERIENCE
  // =====================================================

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }

    updateFormData([...experiences, newExperience])
  }

  // =====================================================
  // REMOVE EXPERIENCE
  // =====================================================

  const removeExperience = (id) => {
    const updatedExperiences = experiences.filter(
      (experience) => experience.id !== id
    )

    updateFormData(updatedExperiences)
  }

  // =====================================================
  // UPDATE EXPERIENCE
  // =====================================================

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences.map((experience) =>
      experience.id === id
        ? {
            ...experience,
            [field]: value,

            ...(field === "current" && value
              ? { endDate: "" }
              : {}),
          }
        : experience
    )

    updateFormData(updatedExperiences)
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
    bg-[#F8FAFC]
    px-4
    text-sm
    font-medium
    text-[#111827]
    outline-none
    transition-all
    duration-200
    placeholder:text-[#718096]
    hover:border-[#CBD5E1]
    hover:bg-white
    focus:border-[#6366F1]
    focus:bg-white
    focus:ring-4
    focus:ring-[#EEF2FF]
  `

  const labelClass = `
    mb-2
    block
    text-[12px]
    font-bold
    tracking-wide
    text-[#334155]
  `

  const sectionTitleClass = `
    text-[15px]
    font-black
    tracking-tight
    text-[#111827]
  `

  const sectionDescriptionClass = `
    mt-1
    text-xs
    leading-5
    text-[#718096]
  `

  // =====================================================
  // SECTION HEADER
  // =====================================================

  const SectionHeader = ({
    title,
    description,
    optional = false,
  }) => (
    <div className="mb-5">
      <div className="flex items-center gap-3">
        <h3 className={sectionTitleClass}>
          {title}
        </h3>

        <div className="h-px flex-1 bg-[#E2E8F0]" />

        {optional && (
          <span
            className="
              shrink-0
              rounded-full
              border
              border-[#E2E8F0]
              bg-[#F8FAFC]
              px-2.5
              py-1
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[#718096]
            "
          >
            Optional
          </span>
        )}
      </div>

      {description && (
        <p className={sectionDescriptionClass}>
          {description}
        </p>
      )}
    </div>
  )

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="
        flex
        h-full
        min-h-0
        min-w-0
        flex-col
        overflow-hidden
        bg-white
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

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
                d="M20 7h-3V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h10M9 12h6"
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
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#6366F1]
                "
              >
                Step 03
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
              Work experience
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
              Add your previous roles and highlight the
              experience, responsibilities, and achievements
              that matter most.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          FORM CONTENT
      ===================================================== */}

      <div
        className="
          min-h-0
          min-w-0
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
              EXPERIENCE ENTRIES
          ================================================== */}

          {experiences.map((experience, index) => (
            <section
              key={experience.id}
              className="
                rounded-2xl
                border
                border-[#E2E8F0]
                bg-white
                p-5
                shadow-[0_3px_16px_rgba(15,23,42,0.035)]
                sm:p-6
              "
              style={{
                marginTop: index === 0 ? "0" : "28px",
              }}
            >
              <SectionHeader
                title={`Experience ${index + 1}`}
                description={
                  experience.current
                    ? "Your current professional role."
                    : "Add the details of this professional position."
                }
              />

              {/* =================================================
                  ENTRY TOP INFO
              ================================================== */}

              <div className="mb-6 flex items-center justify-between gap-4">

                <div className="flex flex-wrap items-center gap-2">

                  {experience.current && (
                    <span
                      className="
                        rounded-full
                        bg-[#E0E7FF]
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#4F46E5]
                      "
                    >
                      Current position
                    </span>
                  )}

                  {!experience.current && (
                    <span
                      className="
                        rounded-full
                        bg-[#F8FAFC]
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#718096]
                      "
                    >
                      Previous position
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeExperience(experience.id)
                  }
                  className="
                    shrink-0
                    rounded-xl
                    border
                    border-[#E2E8F0]
                    bg-white
                    px-3.5
                    py-2.5
                    text-xs
                    font-bold
                    text-[#475569]
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
                  BASIC EXPERIENCE INFORMATION
              ================================================== */}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* JOB TITLE */}

                <div className="md:col-span-2">
                  <label
                    htmlFor={`jobTitle-${experience.id}`}
                    className={labelClass}
                  >
                    Job title
                    <span className="ml-1 text-[#6366F1]">
                      *
                    </span>
                  </label>

                  <input
                    id={`jobTitle-${experience.id}`}
                    type="text"
                    value={experience.jobTitle}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "jobTitle",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Frontend Developer"
                    autoComplete="organization-title"
                    className={inputClass}
                  />
                </div>

                {/* COMPANY */}

                <div>
                  <label
                    htmlFor={`company-${experience.id}`}
                    className={labelClass}
                  >
                    Company
                    <span className="ml-1 text-[#6366F1]">
                      *
                    </span>
                  </label>

                  <input
                    id={`company-${experience.id}`}
                    type="text"
                    value={experience.company}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "company",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Google"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </div>

                {/* LOCATION */}

                <div>
                  <label
                    htmlFor={`experience-location-${experience.id}`}
                    className={labelClass}
                  >
                    Location
                  </label>

                  <input
                    id={`experience-location-${experience.id}`}
                    type="text"
                    value={experience.location}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "location",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Islamabad, Pakistan"
                    autoComplete="address-level2"
                    className={inputClass}
                  />
                </div>

                {/* START DATE */}

                <div>
                  <label
                    htmlFor={`experience-start-${experience.id}`}
                    className={labelClass}
                  >
                    Start date
                  </label>

                  <input
                    id={`experience-start-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "startDate",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                {/* END DATE */}

                <div>
                  <label
                    htmlFor={`experience-end-${experience.id}`}
                    className={labelClass}
                  >
                    End date
                  </label>

                  <input
                    id={`experience-end-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    disabled={experience.current}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "endDate",
                        event.target.value
                      )
                    }
                    className={`
                      ${inputClass}
                      disabled:cursor-not-allowed
                      disabled:bg-[#F8FAFC]
                      disabled:text-[#94A3B8]
                      disabled:opacity-70
                    `}
                  />
                </div>

                {/* CURRENT JOB */}

                <div className="md:col-span-2">
                  <label
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-white
                      px-4
                      py-3
                      transition-all
                      duration-200
                      hover:border-[#E0E7FF]
                      hover:bg-[#EEF2FF]
                    "
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(experience.current)}
                      onChange={(event) =>
                        updateExperience(
                          experience.id,
                          "current",
                          event.target.checked
                        )
                      }
                      className="
                        h-4
                        w-4
                        cursor-pointer
                        rounded
                        border-[#CBD5E1]
                        accent-[#6366F1]
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-medium
                        text-[#475569]
                        transition-colors
                        group-hover:text-[#111827]
                      "
                    >
                      I currently work here
                    </span>
                  </label>
                </div>

                {/* DESCRIPTION */}

                <div className="md:col-span-2">

                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor={`experience-description-${experience.id}`}
                      className="
                        text-[12px]
                        font-bold
                        tracking-wide
                        text-[#334155]
                      "
                    >
                      Description
                    </label>

                    <span
                      className="
                        text-[10px]
                        font-medium
                        text-[#718096]
                      "
                    >
                      Optional
                    </span>
                  </div>

                  <textarea
                    id={`experience-description-${experience.id}`}
                    rows={7}
                    value={experience.description}
                    maxLength={1000}
                    onChange={(event) =>
                      updateExperience(
                        experience.id,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe your responsibilities, achievements, and impact..."
                    className="
                      min-h-[170px]
                      w-full
                      resize-y
                      rounded-xl
                      border
                      border-[#E2E8F0]
                      bg-[#F8FAFC]
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
                      hover:bg-white
                      focus:border-[#6366F1]
                      focus:bg-white
                      focus:ring-4
                      focus:ring-[#EEF2FF]
                    "
                  />

                  <div className="mt-2 flex items-center justify-between gap-4">

                    <p
                      className="
                        text-[11px]
                        leading-5
                        text-[#718096]
                      "
                    >
                      Focus on achievements rather than simply
                      listing duties.
                    </p>

                    <span
                      className="
                        shrink-0
                        text-[10px]
                        font-semibold
                        text-[#718096]
                      "
                    >
                      {experience.description?.length || 0}/1000
                    </span>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* =================================================
              EMPTY STATE
          ================================================== */}

          {experiences.length === 0 && (
            <section
              className="
                rounded-2xl
                border
                border-[#E2E8F0]
                bg-white
                p-5
                shadow-[0_3px_16px_rgba(15,23,42,0.035)]
                sm:p-6
              "
            >
              <SectionHeader
                title="Work experience"
                description="Add your previous roles and professional experience."
              />

              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-[#E2E8F0]
                  bg-[#F8FAFC]
                  px-6
                  py-12
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#EEF2FF]
                    text-2xl
                    font-bold
                    text-[#6366F1]
                  "
                >
                  +
                </div>

                <h3
                  className="
                    mt-4
                    text-base
                    font-black
                    tracking-tight
                    text-[#111827]
                  "
                >
                  Add your work experience
                </h3>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-md
                    text-xs
                    leading-5
                    text-[#718096]
                  "
                >
                  Add your current or previous positions to
                  show employers what you have accomplished.
                </p>
              </div>
            </section>
          )}

          {/* =================================================
              ADD EXPERIENCE
          ================================================== */}

          <button
            type="button"
            onClick={addExperience}
            className="
              mt-7
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-dashed
              border-[#C7D2FE]
              bg-[#EEF2FF]
              px-5
              py-3.5
              text-sm
              font-bold
              text-[#6366F1]
              transition-all
              duration-200
              hover:border-[#A5B4FC]
              hover:bg-[#E0E7FF]
            "
          >
            <span className="text-lg leading-none">
              +
            </span>

            Add another experience
          </button>

          {/* =================================================
              BOTTOM SPACE
          ================================================== */}

          <div className="h-4" />
        </div>
      </div>
    </section>
  )
}

export default Experience
