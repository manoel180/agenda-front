<template>
    <div v-if="currentContact" class="edit-form">
        <h4>Contact</h4>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name"
                       v-model="currentContact.name"
                />
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" id="phone"
                       v-model="currentContact.phone"
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email"
                       v-model="currentContact.email"
                />
            </div>

            <div class="form-group">
                <label><strong>Gender:</strong></label>
                {{ currentContact.gender}}
            </div>
        </form>


        <button class="badge badge-danger mr-2"
                @click="deleteContact"
        >
            Delete
        </button>

        <button type="submit" class="badge badge-success"
                @click="updateContact"
        >
            Save
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a Contact...</p>
    </div>
</template>

<script>
    import ContactServices from "../services/ContactServices";

    export default {


        name: "contact",
        data() {
            return {
                currentContact: null,
                message: ''
            };
        },
        methods: {
            getContact(id) {
                ContactServices.get(id)
                    .then(response => {
                        this.currentContact = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updatePublished(status) {
                var data = {
                    id: this.currentContact.id,
                    title: this.currentContact.title,
                    description: this.currentContact.description,
                    published: status
                };
                ContactServices.update(this.currentContact.id, data)
                    .then(response => {
                        this.currentContact.published = status;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updateContact() {
                ContactServices.update(this.currentContact.id, this.currentContact)
                    .then(response => {
                        console.log(response.data);
                        this.message = 'The contact was updated successfully!';
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            deleteContact() {
                ContactServices.delete(this.currentContact.id)
                    .then(response => {
                        console.log(response.data);
                        this.$router.push({ name: "contacts" });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.message = '';
            this.getContact(this.$route.params.id);
        }
    };
</script>

<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>