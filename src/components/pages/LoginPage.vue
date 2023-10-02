<template>
  <div
    class="flex !flex-nowrap"
  >
    <div class="w-fit">
      <img
        src="images/login/kitty-cat.jpg"
        alt=""
        class="half-screen-image"
      >
    </div>
    <div class="bg-[#f7f7f7] w-full flex justify-center items-center  relative">
      <div class="h-fit w-[40%]">
        <transition>
          <div>
            <div
              :class="{'hidden':tabNumber!=0}"
              class="tab-transition"
            >
              <div class="text-[36px] font-bold text-center text-[#8071b3]">
                Sign In
              </div>
              <span class="text-gray-400 pb-12 block text-center">Already have an account? <span class="text-[#515151] underline cursor-pointer">login</span></span>
              <div>
                <q-input
                  v-model="user.email"
                  outlined
                  type="email"
                  label="Email address"
                  class="py-2"
                  :rules="[ 
                    (val, rules) => rules.email(val) || 'Please enter a valid email address',
                    val=>val.length <= 50||'Please use maximum 50 characters' 
                  ]"
                />
                <q-input
                  v-model="user.password"
                  outlined
                  :type="isPasswordShow ? 'password' : 'text'"
                  label="Password"
                  class="py-2"
                  :rules="[ 
                    val=>val.length <= 25||'Please use maximum 50 characters' 
                  ]"
                >
                  <template #append>
                    <q-icon
                      :name="isPasswordShow ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPasswordShow = !isPasswordShow"
                    />
                  </template>
                </q-input>
              </div>
              <div class="my-4 ">
                <q-btn
                  class="!bg-[#8071b3] text-white !w-full !py-3"
                  label="Create"
                  @click="validateLoginInfo"
                />
                <span class="text-gray-400 text-center block mt-1">By joining, you agree to the <span class="underline text-[#515151] cursor-pointer">Terms</span> and <span class="underline text-[#515151] cursor-pointer">Privacy Policy</span></span>
              </div>
            </div>
            <div
              :class="{'hidden':tabNumber!=1}"
              class="tab-transition"
            >
              <div class="absolute top-0 left-0 ml-3 mt-3">
                <CIcon
                  icon="Arrow Back"
                  class="w-24 !text-[30px] text-center text-[#8071b3]"
                  @click="tabNumber--"
                />
              </div>
              <div class="text-[24px] font-bold text-center text-[#8071b3]">
                Complete the following steps to configure your profile
              </div>
              <div>
                <input
                  ref="avatarInput"
                  type="file"
                  name="avatar"
                  class="!invisible !h-[1px]"
                  accept="image/*"
                  @change="uploadAvatarFileHandler($event)"
                >
                <div class="flex justify-center items-center">
                  <q-btn
                    round
                    @click="inputAvatarFileHandler"
                  >
                    <q-avatar size="56px">
                      <img :src="user.avatar == ''? 'images/login/default-avatar.jpg' : user.avatar">
                    </q-avatar>
                  </q-btn>
                </div>
              </div>
              <div class="mt-4">
                <q-input
                  v-model="user.name"
                  outlined
                  label="Name"
                  class="py-2"
                  :rules="[val=>val.length > 5 || 'make sure that your name is not shorter 5 characters']"
                />
                <q-input
                  v-model="user.location"
                  outlined
                  label="Address"
                  class="py-2"
                  :rules="[val=>val.length > 5 || 'make sure that your location is not shorter 5 characters']"
                />
                <q-input
                  v-model="user.phone"
                  outlined
                  type="number"
                  label="Phone Number"
                  class="py-2"
                  :rules="[val=>validatePhoneNumber(val) || 'invalid phone number, please type again']"
                />
              </div>
              <q-btn
                class="!bg-[#8071b3] text-white !w-full !py-3"
                label="Continue"
                @click="validateLoginMoreInfo"
              />
            </div>
            <div :class="{'hidden':tabNumber!=2}">
              <div class="absolute top-0 left-0 ml-3 mt-3">
                <CIcon
                  icon="Arrow Back"
                  class="w-24 !text-[30px] text-center text-[#8071b3]"
                  @click="tabNumber--"
                />
              </div>
              <div class="text-[36px] font-bold text-center text-[#8071b3]">
                Payment Method
              </div>
              <div class="mt-4">
                <q-input
                  v-model="user.cardHolder"
                  outlined
                  label="card holder"
                  class="py-2"
                />
                <q-input
                  v-model="user.cardNumber"
                  outlined
                  label="card number"
                  class="py-2"
                >
                  <template #append>
                    <q-avatar>
                      <img src="images/login/mc-logo.svg">
                    </q-avatar>
                  </template>
                </q-input>
                <div class="flex !flex-nowrap">
                  <q-input
                    v-model="user.expireDate"
                    outlined
                    type="date"
                    label="expired date"
                    class="py-2 mr-[auto]"
                  />
                  <q-input
                    v-model="user.CVC"
                    outlined
                    label="CVC"
                    class="py-2"
                  />
                </div>
              </div>
              <q-btn
                class="!bg-[#8071b3] text-white !w-full !py-3"
                label="Sign In"
                @click="createAccountClickHandler"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import accountRepository from 'repository/accountRepository';
import { STATUS_CODES } from 'http';
import { STATUS_CODE } from 'src/common/StatusCode';


  const tabNumber = ref(0);
  const isPasswordShow = ref(true);
  const user =  ref({
    name:"",
    email:"",
    password:"",
    phone:"",
    location:"",
    cardHolder:"",
    cardNumber:"",
    expireDate:new Date() as any,
    CVC:"",
    avatar:""
  });

  const avatarInput = ref();

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const inputAvatarFileHandler= () =>{
    avatarInput.value.click();
  }

  const uploadAvatarFileHandler = async (event) =>{
    const avatarFile = event.target.files[0];
    user.value.avatar = await toBase64(avatarFile) as string;
  }

  const validateEmail= (email)=> {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const validatePhoneNumber =(phone)=>{
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber) ? true : false;
  }

  const validateLoginInfo = () =>{
    if(validateEmail(user.value.email) && user.value.email.length < 50 && user.value.password.length < 50){
      tabNumber.value++
    }
  }
  
  const validateLoginMoreInfo = () =>{
    if(validatePhoneNumber(user.value.phone) && user.value.name.length > 5 && user.value.location.length > 5){
      tabNumber.value++;
    }
  }

  const createAccountClickHandler = async () =>{
    const account = {
      Email: user.value.email,
      password: user.value.password,
      Name: user.value.name,
      PhoneNumber: user.value.phone,
      Address: user.value.location,
      CardHolder: user.value.cardHolder,
      CardExpiredDate: user.value.expireDate ,
      CVC: user.value.CVC,
    }
    const result = await accountRepository.signUp(account)
    if(result.code === STATUS_CODE.CONFLICT ){
      alert("already have account");
    }
    else{
      alert("success");
    }
  }
  onMounted(()=>{
  })
</script>

<style scoped lang="scss">
.half-screen-image{
  width:auto; 
  height:100vh;
  object-fit: fill;
}

.tab-transition{
  @apply transition-all
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>