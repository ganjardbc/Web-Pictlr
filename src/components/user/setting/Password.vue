<template>
<div>
    <div class="frame-home frame-edit">
        <div class="grid-2x col-800px">
            <div class="grid-1">

                <frame-menu-setting></frame-menu-setting>

            </div>
            <div class="grid-2">
                <form 
                    id="form-edit-profile" 
                    method="post" 
                    action="javascript:void(0)" 
                    onsubmit="">
                    <div class="sc-header">
                        <div class="sc-place">
                            <div class="">
                                <div class="sc-grid sc-grid-1x">
                                    <div class="sc-col-1 padding-top-15px">
                                        <h3 class="txt-site txt-small txt-main txt-extra-bold">
                                            Change Password
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="frame-home frame-edit">
                        <div class="compose" id="create">
                            <div class="main ">
                                <div class="edit-body">
                                    <div class="edit-block">
                                        <div class="place-edit">
                                            <div class="pe-1">
                                                Old password
                                            </div>
                                            <div class="pe-2">
                                                <input 
                                                    type="password" 
                                                    name="old-password" 
                                                    class="txt txt-primary-color" 
                                                    id="old-password" 
                                                    required="true" 
                                                    placeholder="Old Password">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="place-edit">
                                            <div class="pe-1">
                                                New password
                                            </div>
                                            <div class="pe-2">
                                                <input 
                                                    type="password" 
                                                    name="new-password" 
                                                    class="txt txt-primary-color" 
                                                    id="new-password" 
                                                    required="true" 
                                                    placeholder="New Password">
                                            </div>
                                        </div>
                                        <div class="place-edit">
                                            <div class="pe-1">
                                                Confirm password
                                            </div>
                                            <div class="pe-2">
                                                <input 
                                                    type="password" 
                                                    name="renew-password" 
                                                    class="txt txt-primary-color" 
                                                    id="renew-password" 
                                                    required="true" 
                                                    placeholder="Confirm Password">
                                            </div>
                                        </div>
                                        <div class="place-edit">
                                            <div class="pe-1"></div>
                                            <div class="pe-2 pe-btn">
                                                <input 
                                                    type="button" 
                                                    name="edit-cancel" 
                                                    class="btn btn-grey2-color" 
                                                    value="Cancel"
                                                    @click="$goBack()">
                                                <input 
                                                    type="submit" 
                                                    name="edit-save" 
                                                    class="btn btn-main-color" 
                                                    value="Save">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="padding-bottom-15px"></div>
                </form>

            </div>
        </div>
    </div>
</div>
</template>
<script>
import SettingMenu from './SettingMenu.vue';
export default {
    components: {
        'frame-menu-setting': SettingMenu,
    }
}
</script>
