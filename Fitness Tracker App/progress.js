let workouts = [];

const storedWorkouts = localStorage.getItem("workouts");
if (storedWorkouts) {
    workouts = JSON.parse(storedWorkouts);
};

const workoutHistory = document.getElementById("workout-history");

displayExercises(workouts);

function displayExercises(workouts) {
    workoutHistory.innerHTML = "";
    workouts.forEach((workout) => {
        const resultsDiv = document.createElement("div");
        resultsDiv.classList.add('workout-card');

        resultsDiv.innerHTML = `
            <h4 class="date">${workout.date}</h4>

            <h3>${workout.exerciseInput}</h3>

            <p><strong>Weight:</strong> ${workout.weightInput} kg</p>

            <p><strong>Sets × Reps:</strong> ${workout.setsInput} × ${workout.repsInput}</p>

            <button class="delete-btn" data-id="${workout.id}">Delete</button>
        `
        workoutHistory.appendChild(resultsDiv);
    })
};

function saveToLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
};

workoutHistory.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        deleteWorkout(id);
    }
});

function deleteWorkout(id) {
    workouts = workouts.filter(w => w.id !== id);
    saveToLocalStorage();
    displayExercises(workouts);
}
