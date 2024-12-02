<template>
    <div>
    <h1>Dashboard Administrateur</h1>
    <table style="border: 1px solid white; color: white; padding: 1rem; margin-bottom: 0.5rem;">
      <thead>
        <tr>
          <th>Nom d'utilisateur</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <select v-model="user.role" @change="updateRole(user.id, user.role)">
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </td>
          <td>
            <button @click="deleteUser(user.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="color:white">Liste des utilisateurs</p>

    <div v-if="users.length" style="margin-top: 2rem;">
      <div
        v-for="(user, index) in users"
        :key="index"
        @click="selectUser(user)"
        style="border: 1px solid white; color: white; padding: 1rem; margin-bottom: 0.5rem; cursor: pointer;"
      >
        <p><strong>Nom d'utilisateur :</strong> {{ user.username }}</p>
        <p><strong>Email :</strong> {{ user.email }}</p>
        <p><strong>Rôle :</strong> {{ user.role }}</p>
        <p><strong>Date de création :</strong> {{ new Date(user.created_at).toLocaleString() }}</p>
      </div>
    </div>

    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <h2>Messages de {{ selectedUser.username }}</h2>
        <ul v-if="userMessages.length" class="message-list">
          <li v-for="message in userMessages" :key="message.id" class="message-item">
            <div class="message-text">
              <p><strong>Thread :</strong> {{ message.thread_name }}</p>
              <p><strong>Message :</strong> {{ message.content }}</p>
              <p><strong>Date :</strong> {{ new Date(message.publication_date).toLocaleString() }}</p>
            </div>
            <button @click="deleteMessage(message.id)" class="delete-message-btn">Supprimer</button>
            <hr class="message-divider" />
          </li>
        </ul>
        <p v-else>Pas de messages pour cet utilisateur.</p>
        <button @click="closeModal" class="close-modal-btn">Fermer</button>
      </div>
    </div>
    <!--
    <div v-else>
      <p style="color: white;">Chargement des utilisateurs...</p>
    </div>
    -->
    <h2 style="color:white">Gestion des Sections</h2>
    <div>
      <input
        v-model="newSectionType"
        placeholder="Nom de la nouvelle section"
        style="margin-bottom: 1rem; padding: 0.5rem;"
      />
      <button @click="addSection" style="padding: 0.5rem; background-color: #4caf50; color: white;">
        Ajouter une section
      </button>
    </div>
    <div v-if="sections.length" class="section-list">
      <div
        v-for="section in sections"
        :key="section.id"
        class="section-item"
        @click="selectSection(section)"
      >
        <p style="color:white"><strong>Nom de la section :</strong> {{ section.type }}</p>
        <button @click.stop="deleteSection(section.id)" class="delete-section-btn">
          Supprimer
        </button>
      </div>
    </div>
    <div v-if="selectedSection" class="modal">
      <div class="modal-content">
        <h2>Threads de la section : {{ selectedSection.type }}</h2>
        <ul v-if="threads.length" class="thread-list">
          <li v-for="thread in threads" :key="thread.id" class="thread-item">
            <div class="thread-text">
              <p><strong>Titre :</strong> {{ thread.title }}</p>
            </div>
            <button @click="viewThreadMessages(thread.id)" class="view-thread-btn">
              Voir les messages
            </button>
            <button @click="deleteThread(thread.id)" class="delete-thread-btn">Supprimer</button>
            <hr class="thread-divider" />
          </li>
        </ul>
        <p v-else>Pas de threads dans cette section.</p>
        <button @click="closeModal" class="close-modal-btn">Fermer</button>
        <div v-if="showNewThreadForm">
          <input
            v-model="newThreadTitle"
            placeholder="Titre du nouveau thread"
            style="margin-bottom: 1rem; padding: 0.5rem;"
          />
          <button @click="createThread" style="padding: 0.5rem; background-color: #4caf50; color: white;">
            Créer un thread
          </button>
          <button @click="toggleNewThreadForm" style="padding: 0.5rem; background-color: #f44336; color: white;">
            Annuler
          </button>
        </div>
        <button @click="toggleNewThreadForm" style="padding: 0.5rem; background-color: #4caf50; color: white;">
          Nouveau Thread
        </button>
      </div>
    </div>
    <div v-if="selectedThread" class="modal">
      <div class="modal-content">
        <h2>Messages du thread</h2>
        <ul v-if="threadMessages.length" class="message-list">
          <li v-for="message in threadMessages" :key="message.id" class="message-item">
            <div class="message-text">
              <p><strong>Message :</strong> {{ message.content }}</p>
              <p><strong>Date :</strong> {{ new Date(message.publication_date).toLocaleString() }}</p>
            </div>
            <button @click="deleteMessage(message.id)" class="delete-message-btn">Supprimer</button>
            <hr class="message-divider" />
          </li>
        </ul>
        <p v-else>Pas de messages dans ce thread.</p>
        <button @click="closeThreadModal" class="close-modal-btn">Fermer</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const selectedUser = ref(null);
const userMessages = ref([]);
const sections = ref([]);
const threads = ref([]);
const threadMessages = ref([]);
const newThreadTitle = ref("");
const showNewThreadForm = ref(false);
const newSectionType = ref("");
const selectedSection = ref(null);
const selectedThread = ref(null);

const updateRole = async (userId, newRole) => {
  try {
    await axios.put(`http://localhost:3000/users/${userId}`, { role: newRole });
    alert('Rôle mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle :', error);
    alert('Échec de la mise à jour du rôle');
  }
};
const deleteUser = async (userId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      users.value = users.value.filter(user => user.id !== userId);
      alert('Utilisateur supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur :', error);
      alert('Échec de la suppression de l’utilisateur');
    }
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users/forAdmin');
    users.value = response.data;
    console.log('Utilisateurs chargés :', users.value);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
};

// const selectUser = async (user) => {
//   selectedUser.value = user;
//   try {
//     const response = await axios.get(`http://localhost:3000/posts/author/${user.id}`);
//     userMessages.value = response.data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des messages :', error);
//     userMessages.value = [];
//   }
// };

const selectUser = async (user) => {
  selectedUser.value = user;
  try {
    const response = await axios.get(`http://localhost:3000/posts/author/${user.id}`);
    const messages = response.data;

    const messagesWithThreads = await Promise.all(
      messages.map(async (message) => {
        try {
          const threadResponse = await axios.get(`http://localhost:3000/threads/${message.thread_id}`);
          return {
            ...message,
            thread_name: threadResponse.data[0].title,
          };
        } catch (error) {
          console.error('Erreur lors de la récupération du thread:', error);
          return {
            ...message,
            thread_name: 'Nom du thread introuvable',
          };
        }
      })
    );

    userMessages.value = messagesWithThreads;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    userMessages.value = [];
  }
};

const deleteMessage = async (messageId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
    try {
      await axios.delete(`http://localhost:3000/posts/${messageId}`);
      userMessages.value = userMessages.value.filter(msg => msg.id !== messageId);
      // alert('Message supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du message :', error);
      alert('Échec de la suppression du message');
    }
  }
};

const fetchSections = async () => {
  try {
    const response = await axios.get("http://localhost:3000/sections");
    sections.value = response.data;
    console.log('sections.value', sections.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des sections :", error);
  }
};

const addSection = async () => {
  if (!newSectionType.value.trim()) {
    alert("Le nom de la section est requis !");
    return;
  }
  try {
    console.log('newSectionType', newSectionType.value);
    await axios.post("http://localhost:3000/sections", { type: newSectionType.value });
    newSectionType.value = "";
    fetchSections();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la section :", error);
  }
};

const deleteSection = async (sectionId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) {
    try {
      await axios.delete(`http://localhost:3000/sections/${sectionId}`);
      sections.value = sections.value.filter((section) => section.id !== sectionId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la section :", error);
    }
  }
};

const selectSection = async (section) => {
  selectedSection.value = section;
  try {
    const response = await axios.get(`http://localhost:3000/threads/section/${section.id}`);
    threads.value = response.data;
    console.log('threads.value', threads.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des threads :", error);
  }
};

const deleteThread = async (threadId) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce thread ?")) {
    try {
      await axios.delete(`http://localhost:3000/threads/${threadId}`);
      threads.value = threads.value.filter((thread) => thread.id !== threadId);
    } catch (error) {
      console.error("Erreur lors de la suppression du thread :", error);
    }
  }
};
const viewThreadMessages = async (threadId) => {
  selectedThread.value = threadId;
  try {
    const response = await axios.get(`http://localhost:3000/posts/thread/${threadId}`);
    threadMessages.value = response.data;
    console.log('threadMessages.value', response.data[0]);
    console.log('threadMessages.value', threadMessages.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    threadMessages.value = [];
  }
};

const toggleNewThreadForm = () => {
  showNewThreadForm.value = !showNewThreadForm.value;
  newThreadTitle.value = "";
};

const createThread = async () => {
  if (!newThreadTitle.value.trim()) {
    alert("Le titre du thread est requis !");
    return;
  }
  try {
    console.log('section value', selectedSection.value);
    const newThread = {
      title: newThreadTitle.value,
      section_id: selectedSection.value.id,
    };
    await axios.post("http://localhost:3000/threads", newThread);
    await selectSection(selectedSection.value);
    newThreadTitle.value = "";
    showNewThreadForm.value = false;
  } catch (error) {
    console.error("Erreur lors de la création du thread", error);
  }
};

const closeModal = () => {
  selectedUser.value = null;
  userMessages.value = [];
  selectedSection.value = null;
  threads.value = [];
  // selectedThread.value = null;
  // threadMessages.value = [];
};
const closeThreadModal = () => {
  selectedThread.value = null;
  threadMessages.value = [];
};

// onMounted(fetchUsers);
// onMounted(fetchSections);
onMounted(async () => {
  await fetchUsers();
  await fetchSections();
});
</script>
<style scoped>
.dashboard-title {
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th,
.admin-table td {
  border: 1px solid white;
  padding: 0.5rem;
  text-align: center;
}

.delete-user-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.delete-user-btn:hover {
  background-color: #ff1744;
}

.user-list {
  margin-top: 2rem;
}

.user-block {
  border: 1px solid white;
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
}

.user-block:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  color: black;
  padding: 2rem;
  border-radius: 8px;
  width: 50%;
  max-height: 80vh;
  overflow-y: auto;
}

.close-modal-btn {
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.close-modal-btn:hover {
  background-color: #333;
}

.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
.message-text{
  color: black;
}

.message-divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 1rem 0;
}

.delete-message-btn {
  margin-left: auto;
  background-color: #ff5252;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

.delete-message-btn:hover {
  background-color: #ff1744;
}
</style>
