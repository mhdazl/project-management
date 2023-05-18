import React from "react";
import { useTranslation } from "react-i18next";
function CreateTask({
  onSubmit,
  handleInputChange,
  values,
  addForm,
  showForm,
  errors,
}) {
  const { t } = useTranslation();
  const { title, description, priority } = values;

  return (
    <>
      {!addForm ? (
        <button type="button" className="cursor-pointer" onClick={showForm}>
          <div className="text-center text-sm font-medium primary-text-color">
            <div className="flex items-center justify-center py-2 mt-1">
              <div className="w-4 h-4 bg-gray-200 rounded-md icon-background flex items-center justify-center mr-1 ml-2">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </div>
              <span class="ml-1 underline">{t("Create Task")}</span>
            </div>
          </div>
        </button>
      ) : (
        <div className="mb-3 relative flex flex-col items-start p-4 mt-3 hover:border-1 border-card card-custom-bg rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100">
          <form onSubmit={onSubmit} className="w-full">
            <input
              type="text"
              placeholder={t("Title")}
              name="title"
              id="title"
              value={title ?? ""}
              onChange={handleInputChange}
              className="mt-1  px-2 py-1 border rounded placeholder-blue-800 custom-input w-full"
            />
            <div className="text-red-500 text-xs">{errors?.title ?? ""}</div>

            <textarea
              placeholder={t("Description")}
              name="description"
              id="description"
              value={description ?? ""}
              onChange={handleInputChange}
              className="mt-1 px-2 py-1 border rounded custom-input w-full"
            ></textarea>
            <div className="text-red-500 pb-1 text-xs">
              {errors?.description ?? ""}
            </div>

            <select
              name="priority"
              id="priority"
              value={priority ?? ""}
              onChange={handleInputChange}
              className="mb-2 px-2 py-1 border rounded custom-input text-xs primary-text-color w-full"
            >
              <option value="">{t("Select Priority")}</option>
              <option value="Low">{t("Low")}</option>
              <option value="Medium">{t("Medium")}</option>
              <option value="High">{t("High")}</option>
            </select>

            <button
              type="submit"
              className="bg-blue-500 text-xs text-white px-3 py-1 rounded primary-bg"
            >
              {t("Submit")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default CreateTask;
