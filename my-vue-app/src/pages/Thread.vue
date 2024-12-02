<template>
  <div style="color: white">
    <div>thread page</div>
    <div>{{ route.params.id }}</div>
  </div>
  <div v-if="isAuthenticated">
    <div style="margin-top: 2rem; margin-bottom: 1rem; display: flex; justify-content: center;">
      <input type="text" v-model="newMessage" placeholder="nouveau message" />
      <button @click="postMessage">envoyer</button>
    </div>
  </div>
  <div v-if="posts.length">
    <div 
      v-for="(post, index) in posts" 
      :key="index" 
      style="border-radius: 1rem; color:white; cursor: pointer; border: 1px solid; padding: 10px; margin-bottom: 0.5rem;"
    >
      <div v-if="editingPostId === post.id">
        <input v-model="editMessage" />
        <button @click="updatePost(post.id, index)">Mettre à jour</button>
        <button @click="cancelEdit">Annuler</button>
      </div>
      <div v-else>
        <div style="display: flex; flex-direction: column">
          <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center">
            <div style="display: flex; flex-direction: row; align-items: center; margin-right: 0.5rem;">
              <img v-if="post.authorAvatar" 
              :src="'http://localhost:3000' + post.authorAvatar" 
               alt="Avatar" 
               style="width: 40px; height: 40px; border-radius: 50%; margin-right: 0.5rem;" />
            <div><strong>Auteur:</strong> {{ post.authorName }}</div>
            </div>
            <div><strong>Date de publication:</strong> {{ new Date(post.publication_date).toLocaleString() }}</div>
          </div>
          <div style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
            {{ post.content }}
          </div>
        </div>
        <div v-if="isAuthenticated && isAuthor(post.author_id)">
          <button @click="editPost(post.id, post.content)">Éditer</button>
          <button @click="deletePost(post.id, index)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { jwtDecode } from 'jwt-decode';

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.token !== null);
const route = useRoute();
const posts = ref([]);
const newMessage = ref('');
const editMessage = ref('');
const editingPostId = ref(null);  // Pour gérer l'édition d'un message

const fetchPosts = async () => {
  const threadId = route.params.id;

  try {
    const response = await axios.get(`http://localhost:3000/posts/thread/${threadId}`);
    posts.value = response.data;

    for (const post of posts.value) {
      const authorResponse = await axios.get(`http://localhost:3000/users/${post.author_id}`);
      post.authorName = authorResponse.data[0].username;
      post.authorAvatar = authorResponse.data[0].avatar_url ? authorResponse.data[0].avatar_url : null;
      console.log(post.authorAvatar);
    }
    posts.value.sort((a, b) => new Date(a.publication_date) - new Date(b.publication_date));
  } catch (error) {
    console.error('Erreur lors de la récupération du thread:', error);
  }
};

onMounted(fetchPosts);

const postMessage = async () => {
  if (!newMessage.value.trim()) return;
  try {
    const decodedToken = jwtDecode(authStore.token);
    const authorId = decodedToken.id;

    const response = await axios.post(`http://localhost:3000/posts`, {
      content: newMessage.value,
      thread_id: route.params.id,
      author_id: authorId
    });

    posts.value.push(response.data);
    newMessage.value = '';
    await fetchPosts();
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
  }
};

const editPost = (postId, content) => {
  editingPostId.value = postId;
  editMessage.value = content;
};

const updatePost = async (postId, index) => {
  try {
    await axios.put(`http://localhost:3000/posts/${postId}`, { content: editMessage.value });
    posts.value[index].content = editMessage.value;
    editingPostId.value = null;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
  }
};

const cancelEdit = () => {
  editingPostId.value = null;
};

const deletePost = async (postId, index) => {
  try {
    await axios.delete(`http://localhost:3000/posts/${postId}`);
    posts.value.splice(index, 1);  // Supprimer le post de la liste
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
  }
};

const isAuthor = (authorId) => {
  const decodedToken = jwtDecode(authStore.token);
  return decodedToken.id === authorId;
};
</script>
