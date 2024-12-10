<template>
  <main>
    <h1 style="text-align: center; margin-top: 2.5rem;">Espace de discussion</h1>
    <div class="chat-container">
      <!--
      <div v-if="isAdmin">
        <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <input type="text" v-model="newSectionType" placeholder="nouvelle section" />
            <button @click="postSection()">créer</button>
          </div>
      </div>
      -->
      <div v-if="sections.length">
        <div style="display: flex;flex-direction: row;justify-content: space-around">
          <div 
              v-for="(section, index) in sections" 
              :key="index" 
              @click="fetchThreads(section.id, index)" 
              style="color:white; cursor: pointer; border: 1px solid; padding: 10px;"
              >
              {{ section.type }}
          </div>
        </div>
        <div v-if="isAuthenticated && activeSection">
          <!--
          <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <input type="text" v-model="newThreadTitle" placeholder="nouveau thread" />
            <button @click="postThread()">créer</button>
          </div>
          -->
          <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <input
            v-model="newThreadTitle"
            placeholder="Nouveau sujet"
            style="padding: 0.41rem;"
          />
          <button @click="postThread" style="margin-left: 0.25rem; padding: 0.5rem; border-radius: 4px; border: none; background-color: #4caf50; color: white;">
            Envoyer
          </button>
          </div>
        </div>
        <div v-if="threads.length" class="thread-list">
          <div class="chat-subTitles">
            <p>Liste des sujets</p>
            <p id="last-post">Dernier post</p>
          </div> 
          <div v-for="(thread, threadIndex) in threads" :key="threadIndex" class="thread-item" style="color:white;margin-bottom: 0.5rem">
            <span 
              @click="goToThread(thread.id)"
              class="thread-elem thread-title" 
              style="cursor: pointer; color: white;"
            >
              {{ thread.title }}
            </span>
            <span v-if="latestPosts[thread.id]"
              class="thread-elem thread-date"
            >
              {{ new Date(latestPosts[thread.id]).toLocaleString() }}
            </span>
          </div>
        </div>
        <!--
          <div v-else-if="loading">Chargement des threads...</div>
        -->
        
        <div v-else-if="!sections.length">Chargement des sections...</div>
      </div>
    </div>
  </main>
</template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { ref, onMounted, computed } from 'vue';
  import { useAuthStore } from '../stores/authStore';
  import { jwtDecode } from 'jwt-decode';

  const authStore = useAuthStore();

  const isAuthenticated = computed(() => authStore.token !== null);
  const newSectionType = ref('');
  const newThreadTitle = ref('');
  const activeSection = ref('');
  const router = useRouter();
  const sections = ref([]);
  const threads = ref([]);
  const latestPosts = ref({});
  const loading = ref(false);
  // const isAdmin = ref(false);

  onMounted(async () => {
  try {
    await fetchSections();

    if (authStore.token) {
      const decodedToken = jwtDecode(authStore.token);
      try {
        const user = await axios.get(`http://localhost:3000/users/${decodedToken.id}`);
        console.log('role ', user.data[0].role);  
        // isAdmin.value = user.data[0].role === 'admin';
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    await fetchThreads(sections.value[1].id);
  } catch (error) {
    console.error('error !!!', error);
    console.error('Network error:', error.request);
    console.error('Server error:', error.response.data);
  }});

  const goToThread = (threadId) => {
    router.push({ name: 'thread', params: { id: threadId } });
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sections');
      sections.value = response.data;
      console.log('Sections:', sections.value);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const fetchThreads = async (sectionId) => {
  loading.value = true;
  activeSection.value = sectionId
  try {
    const response = await axios.get(`http://localhost:3000/threads/section/${sectionId}`);
    threads.value = response.data;
    console.log(`Threads pour la section ${sectionId}:`, threads.value);

    for (const thread of threads.value) {
      const postResponse = await axios.get(`http://localhost:3000/posts/thread/last/${thread.id}`);
      console.log('postResponse.data', postResponse.data);
      if (postResponse.data && postResponse.data.length) {
        latestPosts.value[thread.id] = postResponse.data[0].publication_date;
      }
    }
  } catch (error) {
    console.error(`Erreur lors du chargement des threads de la section ${sectionId}:`, error);
  } finally {
    loading.value = false;
  }
};
const postSection = async () => {
  if (!newSectionType.value.trim()) return;
    try {
      await axios.post('http://localhost:3000/sections', {
      type: newSectionType.value,
    });
    newSectionType.value = '';
    await fetchSections();
    } catch(error) {
        console.error('Erreur lors de la création du thread:', error);
    }
}
const postThread = async () => {
  if (!newThreadTitle.value.trim()) return;
    try {
      await axios.post('http://localhost:3000/threads', {
      title: newThreadTitle.value,
      section_id: activeSection.value,
    });
    newThreadTitle.value = '';
    await fetchThreads(activeSection.value);
    } catch(error) {
        console.error('Erreur lors de la création du thread:', error);
    }
}

  // export default {
  //   name: 'ChatPage',
    
  // }
</script>
<style scoped>
.chat-container {
    padding: 20px;
    padding-top: 40px;
    /* margin-top: 2rem; */
    border-radius: 10px;
    border: 2px solid #333;
    background-color: #1e1e1e;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    color: white;
  }
  .thread-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .thread-title {
    flex: 1;
  }
  .thread-date {
    flex: 1;
    text-align: right;
  }
  .chat-subTitles{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .thread-elem{
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .thread-list{
    margin-top:2rem;
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 1200px) {
    main{
      min-width: 550px;
    }
  }
  @media screen and (max-width: 450px) {
    h1{
      font-size: 1.5rem; /* 24px */
line-height: 2rem; /* 32px */
    }
    main {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .chat-container {
      padding-top: 30px;
    }
    .thread-list{
      margin-top:1rem;
      margin-bottom: 1rem;
    }
    .thread-item{
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;
    }
    .thread-elem{
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    #last-post{
      display: none;
    }
    .thread-date{
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
</style>
  