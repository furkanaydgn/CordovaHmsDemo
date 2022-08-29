/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var displayName;



var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },
    onDeviceReady: function () {
        huawei_button_logo();
        document.getElementById('btn_auth_button').addEventListener('click', signIn);
        document.getElementById('exit_from_app').addEventListener('click', exit);
        document.getElementById('log_out_from_account').addEventListener('click', accountSignOut);
        document.getElementById('test').addEventListener('click', accountSignOut);

    }
};


async function exit() {
    navigator.app.exitApp();
}

async function signIn() {

    const signInParameters = {
        authRequestOption: [HMSCommonTypes.AuthRequestOption.SCOPE_ID_TOKEN, HMSCommonTypes.AuthRequestOption.SCOPE_ACCESS_TOKEN, HMSCommonTypes.AuthRequestOption.SCOPE_CARRIER_ID],
        authParam: HMSCommonTypes.AuthParams.DEFAULT_AUTH_REQUEST_PARAM,
        authIdTokenSignAlg: HMSCommonTypes.AuthIdTokenSignAlg.PS256
    }
    const packageName = HMSCommonTypes.PackageName.ACCOUNT;

    const res = await HMSAccountAuthService.signIn(signInParameters, packageName);

    document.getElementById("loading").style.visibility = "visible";

    accessToken = res.accessToken;
    displayName = res.displayName;
    //   alert(JSON.stringify(res.displayName));
    if (accessToken != null) {
        alert("asdas");
        window.location = "movie_page.html";
    }

}

async function accountSignOut() {
    alert("signOut -> test");

    await HMSAccountAuthService.signOut();
    alert("signOut -> success");

}

async function huawei_button_logo() {
    const edittedButton = "btn_auth_button";
    HMSHuaweiIdAuthButton.getHuaweiIdAuthButton(edittedButton,
        HMSHuaweiIdAuthButton.Theme.THEME_FULL_TITLE,
        HMSHuaweiIdAuthButton.ColorPolicy.COLOR_POLICY_RED,
        HMSHuaweiIdAuthButton.CornerRadius.CORNER_RADIUS_LARGE);
}


app.initialize();