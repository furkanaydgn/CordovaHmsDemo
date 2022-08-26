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

var app = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        document.getElementById('test').addEventListener('click', test);

    }
};


async function test() {
    const signInParameters = {
        authRequestOption: [HMSCommonTypes.AuthRequestOption.SCOPE_ID_TOKEN],
        authParam: HMSCommonTypes.AuthParams.DEFAULT_AUTH_REQUEST_PARAM,
        authIdTokenSignAlg: HMSCommonTypes.AuthIdTokenSignAlg.PS256
    }
    const packageName = HMSCommonTypes.PackageName.ACCOUNT;
    try {
        const res = await HMSAccountAuthService.signIn(signInParameters, packageName);
        alert("test");
        alert(JSON.stringify(res));

    } catch (ex) {
        alert(JSON.stringify(ex));
    }
}
app.initialize();