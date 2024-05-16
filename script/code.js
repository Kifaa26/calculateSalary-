document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("userInfoForm");
    const outputDiv = document.getElementById("output");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    document.getElementById("working").addEventListener("change", function() {
        const workingHoursDiv = document.getElementById("workingHoursDiv");
        workingHoursDiv.style.display = this.checked ? "block" : "none";
    });
    document.getElementById("resetForm").addEventListener("click", function() {
        form.reset();
        outputDiv.textContent = "";
    });

    document.getElementById("calculateSalary").addEventListener("click", function() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const age = document.getElementById("age").value;
        const dob = document.getElementById("dob").value;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "";
        const greetingType = document.getElementById("greetingType").value;
        const subjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(subject => subject.value);
        const working = document.getElementById("working").checked;
        const hours = document.getElementById("hours").value;
        const rate = document.getElementById("rate").value;

        const userInfo = {
            firstName,
            lastName,
            age,
            dob,
            gender,
            greetingType,
            subjects,
            working,
            hours,
            rate
        };

        // Check for empty fields
        let errorMessage = "";
        Object.entries(userInfo).forEach(([key, value]) => {
            if (!value) {
                errorMessage += `Please fill in ${key} field.\n`;
                document.getElementById(key).classList.add("error");
            } else {
                document.getElementById(key).classList.remove("error");
            }
        });

        // Check for positive/negative numbers
        if (age < 0) {
            errorMessage += "Age should be a positive number.\n";
            document.getElementById("age").classList.add("error");
        } else {
            document.getElementById("age").classList.remove("error");
        }

        if (hours < 0) {
            errorMessage += "Hours should be a positive number.\n";
            document.getElementById("hours").classList.add("error");
        } else {
            document.getElementById("hours").classList.remove("error");
        }

        if (rate < 0) {
            errorMessage += "Rate should be a positive number.\n";
            document.getElementById("rate").classList.add("error");
        } else {
            document.getElementById("rate").classList.remove("error");
        }

        // Check for leap year
        const year = new Date(dob).getFullYear();
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (isLeapYear) {
            document.getElementById("dob").classList.add("success");
        } else {
            document.getElementById("dob").classList.add("error");
        }

        if (errorMessage) {
            alert(errorMessage);
        } else {
            // Save data to local storage
            const userData = JSON.parse(localStorage.getItem("userData")) || [];
            userData.push(userInfo);
            localStorage.setItem("userData", JSON.stringify(userData));

            // Output formatted message
            const outputMessage = `Hello Dear ${greetingType} ${firstName} ${lastName},`;
            outputDiv.textContent = outputMessage;
        }
    });
});