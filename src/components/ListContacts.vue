<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name"
                       v-model="search_name"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchName"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Contacts List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(contact, index) in contacts"
                    :key="index"
                    @click="setActiveContact(contact, index)"
                >
                    {{ contact.name }}
                </li>
            </ul>

        </div>
        <div class="col-md-6">
            <div v-if="currentContact">
                <h4>Contact</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentContact.name }}
                </div>
                <div>
                    <label><strong>Phone:</strong></label> {{ currentContact.phone }}
                </div>
                <div>
                    <label><strong>Email:</strong></label> {{ currentContact.email }}
                </div>
                <div>
                    <label><strong>Gender:</strong></label> {{ currentContact.gender}}
                </div>

                <a class="badge badge-warning"
                   :href="'/contacts/' + currentContact.id"
                >
                    Edit
                </a>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Contact...</p>
            </div>
        </div>
    </div>
</template>

<script>

    import ContactService from "../services/ContactServices";

    export default {
        name: "ListContacts",
        data() {
            return {
                contacts: [],
                currentContact: null,
                currentIndex: -1,
                search_name: ""
            };
        }
        ,
        methods: {
            retrieveContacts() {
                ContactService.getAll()
                    .then(response => {
                        this.contacts = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            ,
            refreshList() {
                this.retrieveContacts();
                this.currentContact = null;
                this.currentIndex = -1;
            }
            ,
            setActiveContact(contact, index) {
                this.currentContact = contact;
                this.currentIndex = index;
            }
            ,

            searchName() {
                ContactService.findByName(this.search_name)
                    .then(response => {
                        this.contacts = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
        ,
        mounted() {
            this.retrieveContacts();
        }
    }
    ;
</script>

<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>