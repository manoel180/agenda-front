<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input
                        type="text"
                        class="form-control"
                        id="name"
                        required
                        v-model="contact.name"
                        name="name"
                />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input
                        class="form-control"
                        id="email"
                        email
                        required
                        v-model="contact.email"
                        name="email"
                />
            </div>

            <div class="form-group">
                <label for="phone">Phone</label>
                <input
                        class="form-control"
                        id="phone"
                        required
                        v-model="contact.phone"
                        name="phone"
                />
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="male" value="0"
                       v-model="contact.gender"
                       checked>
                <label class="form-check-label" for="male">
                    Male
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="gender" id="female" value="1"
                       v-model="contact.gender">
                <label class="form-check-label" for="female">
                    Female
                </label>
            </div>
            <button @click="saveContact" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newContact">Add</button>
        </div>
    </div>
</template>

<script>
    import ContactServices from "../services/ContactServices";
    export default {
        name: "AddContact",
        data() {
            return {
                contact: {
                    id: null,
                    name: "",
                    email: "",
                    phone: "",
                    gender: 0
                },
                submitted: false
            };
        },
        methods: {
            saveContact() {
                var data = {
                    name: this.contact.name,
                    email: this.contact.email,
                    phone: this.contact.phone,
                    gender: this.contact.gender

                };
                ContactServices.create(data)
                    .then(response => {
                        this.contact.id = response.data.id;
                        console.log(response.data);
                        this.submitted = true;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            newContact() {
                this.submitted = false;
                this.contact = {};
            }
        }
    };
</script>

<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>