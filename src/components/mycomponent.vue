<template>
  <div class="portfolio">
    <img src="@/assets/profile.jpg" alt="Profilbild" class="profile-pic" />
    <h1>Noah David</h1>
    <p>Webentwickler | Vue.js & Frontend-Designer 🚀</p>

    <div class="social-links">
      <a href="https://github.com/noahdavid" target="_blank">GitHub</a>
      <a href="https://linkedin.com/in/noahdavid" target="_blank">LinkedIn</a>
      <a href="mailto:noahdavid@example.com">E-Mail</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
};
</script>

<style scoped>
.portfolio {
  text-align: center;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #333;
}

h1 {
  font-size: 24px;
  margin: 10px 0;
}

p {
  color: #666;
}

.social-links a {
  display: inline-block;
  margin: 10px;
  text-decoration: none;
  color: #0073e6;
  font-weight: bold;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>
