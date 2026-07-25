class Workout {
    constructor(exercise, weight, sets, reps) {
        this.id = Date.now();
        this.date = new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
        this.exercise = exercise;
        this.weight = weight;
        this.sets = sets;
        this.reps = reps;
    }
}

class WorkoutTracker {
    constructor() {
        this.workouts = this.loadWorkouts();
    }

    loadWorkouts() {
        return JSON.parse(localStorage.getItem("workouts")) || []; //this '|| []' removes the need for 'let workouts = []'
    }

    saveWorkouts() {
        localStorage.setItem("workouts", JSON.stringify(this.workouts));
    }

    addWorkout(workout) {
        this.workouts.push(workout);
        this.saveWorkouts();
    }

    deleteWorkout(id) {
        this.workouts = this.workouts.filter(workout => workout.id !== id);
        this.saveWorkouts();
    }

    getWorkouts() {
        return this.workouts;
    }


}

const tracker = new WorkoutTracker();

const form = document.getElementById("exercise-form");
const exercise = document.getElementById("exercise");
const weight = document.getElementById("weight");
const sets = document.getElementById("sets");
const reps = document.getElementById("reps");
const workoutHistory = document.getElementById("workout-history");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const workout = new Workout(exercise.value, weight.value, sets.value, reps.value);
    tracker.addWorkout(workout);
    form.reset();

});