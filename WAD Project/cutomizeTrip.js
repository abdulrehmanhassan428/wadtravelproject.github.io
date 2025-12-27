const phoneRegex = /^[0-9]{10,15}$/;
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input");

    const fields = {
        destination: inputs[0],
        tripDays: inputs[1],
        groupSize: inputs[2],
        tripType: inputs[3],
        fullName: inputs[4],
        cnic: inputs[5],
        totalPersons: inputs[6],
        totalBudget: inputs[7],
        meals: inputs[8],
        guide: inputs[9],
        paymentMethod: inputs[10],
        phone: inputs[11]
    };

    const error = {};
    Object.keys(fields).forEach(key => {
        const p = document.createElement("p");
        p.style.color = "red";
        fields[key].after(p);
        error[key] = p;
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        let isValid = true;
        Object.values(error).forEach(e => e.textContent = "");

        for (let key in fields) {
            if (fields[key].value.trim() === "") {
                error[key].textContent = "Required";
                isValid = false;
            }
        }

        if (!phoneRegex.test(fields.phone.value)) {
            error.phone.textContent = "Invalid phone";
            isValid = false;
        }

        if (!cnicRegex.test(fields.cnic.value)) {
            error.cnic.textContent = "Invalid CNIC";
            isValid = false;
        }

        if (!isValid) return;

        const data = {
            destination: fields.destination.value,
            tripDays: fields.tripDays.value,
            groupSize: fields.groupSize.value,
            tripType: fields.tripType.value,
            fullName: fields.fullName.value,
            cnic: fields.cnic.value,
            totalPersons: fields.totalPersons.value,
            totalBudget: fields.totalBudget.value,
            meals: fields.meals.value,
            guide: fields.guide.value,
            paymentMethod: fields.paymentMethod.value,
            phone: fields.phone.value
        };

        try {
            const res = await fetch(`${API_BASE}/custom-trip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            alert(result.message);
            window.location.href = "WadProject.html";
        } catch {
            alert("Server error");
        }
    });
});
