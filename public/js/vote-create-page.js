document.addEventListener("DOMContentLoaded", () => {
    const pollOptionsContainer = document.getElementById("poll-options-container")
    const addOptionBtn = document.getElementById("add-option-btn")

    // Function to create a new poll option input field
    function createPollOptionField() {
        const optionItem = document.createElement("div")
        optionItem.className = "poll-option-item"

        const input = document.createElement("input")
        input.type = "text"
        input.className = "input poll-option-input"
        input.placeholder = "투표 항목을 입력하세요."
        input.required = true // Make new fields required
        input.name = "poll_option"

        const removeButton = document.createElement("button")
        removeButton.type = "button"
        removeButton.className = "btn-remove-option"
        removeButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    `
        removeButton.addEventListener("click", () => {
            optionItem.remove()
        })

        optionItem.appendChild(input)
        optionItem.appendChild(removeButton)
        return optionItem
    }

    // Add event listener for the "Add Option" button
    addOptionBtn.addEventListener("click", () => {
        pollOptionsContainer.appendChild(createPollOptionField())
    })

    // Attach remove functionality to initial option(s)
    // This ensures that even the pre-existing option can be removed
    const initialRemoveButton = pollOptionsContainer.querySelector(".btn-remove-option")
    if (initialRemoveButton) {
        initialRemoveButton.addEventListener("click", () => {
            initialRemoveButton.closest(".poll-option-item").remove()
        })
    }
})
