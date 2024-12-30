<template>
  <div class="case-infomation">
    <h3>
      Case Information
      <button class="case-btn" @click="toggleForm">Hide</button>
    </h3>
    <form @submit.prevent="submitForm">
      <div class="form-item" v-for="(label, field) in formFields" :key="field">
        <label :for="field">{{ label }}</label>
        <input
          v-if="field !== 'gender'"
          v-model="formData[field]"
          :type="field === 'age' || field === 'patientID' ? 'text' : 'text'"
          :placeholder="'Enter ' + label"
          required
        />
        <select v-else v-model="formData.gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-item-btn">
        <button id="submit-btn" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        surgeon: '',
        patientID: '',
        name: '',
        age: '',
        gender: 'male',
      },
      formFields: {
        surgeon: 'Surgeon',
        patientID: 'Patient ID',
        name: 'Name',
        age: 'Age',
        gender: 'Gender',
      }
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log(this.formData);
    },
    toggleForm() {
      // Logic to hide form (e.g., toggle visibility)
      console.log('Hide button clicked');
    }
  }
};
</script>

<style scoped>
.case-infomation {
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.case-btn {
  background: transparent;
  border: none;
  color: #007BFF;
  cursor: pointer;
}

form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 10px;
}

.form-item label {
  font-weight: bold;
}

.form-item input,
.form-item select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-item-btn {
  text-align: center;
  margin-top: 20px;
}

#submit-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

#submit-btn:hover {
  background-color: #0056b3;
}
</style>
