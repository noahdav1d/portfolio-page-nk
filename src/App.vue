<template>
  <div class="container">
    <header>
      <h1>{{ name }}</h1>
      <p>{{ tagline }}</p>
    </header>

    <section class="about">
      <h2>About Me</h2>
      <p>{{ about }}</p>
    </section>

    <section class="projects">
      <h2>Projects</h2>
      <div v-for="project in projects" :key="project.id" class="project-card">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </section>

    <section class="contact">
      <h2>Contact</h2>
      <p>Email: {{ contact.email }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "John Doe",
      tagline: "Web Developer & Designer",
      about:
        "I am a passionate web developer with experience in Vue.js, building interactive web applications.",
      projects: [
        {
          id: 1,
          title: "Portfolio Website",
          description: "A showcase of my work.",
        },
        {
          id: 2,
          title: "E-commerce Site",
          description: "A Vue-powered online store.",
        },
      ],
      contact: {
        email: "john.doe@example.com",
      },
    };
  },
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
header {
  text-align: center;
  background: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
}
section {
  margin-top: 20px;
  padding: 10px;
  background: #f4f4f4;
  border-radius: 8px;
}
.project-card {
  background: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
