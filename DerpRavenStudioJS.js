window.addEventListener("load", function(){

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetSectionId);
            toggleSection(targetSection);
        });
    });
});

function openCommissionRequest() {
  window.open("https://forms.gle/T6k9DcTkrovqkW1J9", "_blank");
}


function toggleSection(activeSection) {
    // get all the sections and buttons
    const sections = document.querySelectorAll('.drop-down');
    const buttons = document.querySelectorAll('button');
  
    // deactivate all sections and buttons
    sections.forEach(section => section.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));
  
    // activate the active section and button
    const activeButton = document.querySelector(`button[data-target="${activeSection.id}"]`);
    activeSection.classList.add('active');
    activeButton.classList.add('active');
  
    // deactivate all the other sections
    sections.forEach(section => {
      if (section !== activeSection) {
        section.classList.remove('active');
      }
    });
  }