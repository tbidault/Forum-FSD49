<template>
    <div>
      <h1>Espace de discussion</h1>
      <p>Page de discussion</p>
      <div v-if="isAdmin">
        <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <input type="text" v-model="newSectionType" placeholder="nouvelle section" />
            <button @click="postSection()">créer</button>
          </div>
      </div>
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
          <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
            <input type="text" v-model="newThreadTitle" placeholder="nouveau thread" />
            <button @click="postThread()">créer</button>
          </div>
        </div>
        <div v-if="threads.length" style="margin-top:2rem;margin-bottom: 2rem">
          <div v-for="(thread, threadIndex) in threads" :key="threadIndex" style="color:white;margin-bottom: 0.5rem">
            <span 
              @click="goToThread(thread.id)" 
              style="cursor: pointer; color: white; text-decoration: underline;"
            >
              {{ thread.title }}
            </span>
            <span v-if="latestPosts[thread.id]">
              Dernier post : {{ new Date(latestPosts[thread.id]).toLocaleString() }}
            </span>
          </div>
        </div>
        <!--
          <div v-else-if="loading">Chargement des threads...</div>
        -->
        
        <div v-else-if="!sections.length">Chargement des sections...</div>
      </div>
    </div>
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
  const isAdmin = ref(false);

  onMounted(async () => {
  try {
    await fetchSections();

    if (authStore.token) {
      const decodedToken = jwtDecode(authStore.token);
      try {
        const user = await axios.get(`http://localhost:3000/users/${decodedToken.id}`);
        console.log('role ', user.data[0].role);  
        isAdmin.value = user.data[0].role === 'admin';
      } catch (error) {
        console.error(error);
        return false;
      }
    }
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
  