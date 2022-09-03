const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const main = document.getElementById("movie");
const DEVELOPERPAYLOAD = "HMSCoreDeveloper"
getMovies(APIURL);

const PRICETYPE = {
    CONSUMABLE: 0,
    NONCONSUMABLE: 1,
    SUBSCRIPTION: 2,
}
const PRODUCTS = {
    consumable: {
        type: PRICETYPE.SUBSCRIPTION,
        products: [{
            id: 'test_movie_item',
            name: 'test_movie_item'
        }]
    },
}

var app_movie = {

    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        checkEnvironmentReady();
        document.getElementById('signOut').addEventListener('click', accountSignOut);

        for (var i = 0; i < 10; i++) {
            document.getElementById(i).addEventListener('click', buy_movie);
        }

    }
};

async function buy_movie() {
    alert("test");
    try {
        let message = await HMSInAppPurchases.createPurchaseIntent({
            priceType: PRICETYPE.CONSUMABLE,
            productId: "test_movie_item",
            developerPayload: "HMSCoreDeveloper",
        });

        console.log(JSON.stringify(message, ["returnCode", "errMsg", "inAppPurchaseData", "inAppDataSignature", "signatureAlgorithm"]));

        if (message.returnCode === 0) {// if successful
            createPurchasedProductOnList(product.productId, message.inAppPurchaseData, productType)
        } else {
            alert(JSON.stringify(message, null, 4))
            console.log('Purchase was not successful.')
        }
    } catch (err) {
        defaultErrorHandler(err);
    }

}

async function accountSignOut() {

    HMSAccount.signOut().then(function () {
        if (confirm('HuaweiId Authorization will be also deleted!')) {
            HMSAccount.cancelAuthorization();
            alert("signOut -> success");
            window.location = "login.html";
        }

    }).catch(function () {
        alert('signOut -> Error : ' + JSON.stringify(ex));
    });

}


const checkEnvironmentReady = async () => {

    try {
        let message = await HMSInAppPurchases.isEnvReady(true);
        console.log(message);
        let sandbox = await HMSInAppPurchases.isSandboxActivated();
        console.log(sandbox);
        getProductsInformation();
        //    alert("Success(HMSInAppPurchases.isEnvReady):" + JSON.stringify(message, null, 4));
    } catch (errMsg) {
        console.log(errMsg);
        alert("Error(HMSInAppPurchases.isEnvReady): " + errMsg + + JSON.stringify(errMsg, null, 4));
        checkEnvironmentReady();
    }
}

const getProductsInformation = () => {

    Object.keys(PRODUCTS).map(async pType => {
        await obtainProductInfoFromType(pType)
        await obtainOwnedPurchasesFromType(pType)
    })
}

const obtainProductInfoFromType = async (pType) => {
    try {
        let message = await HMSInAppPurchases.obtainProductInfo({
            priceType: PRODUCTS[pType].type,
            productList: PRODUCTS[pType].products.map(p => p.id)
        });
        //     alert(JSON.stringify(message))
        console.log(message);
    } catch (err) {
        defaultErrorHandler(err);
    }
}
const obtainOwnedPurchasesFromType = async (pType) => {
    try {
        let message = await HMSInAppPurchases.obtainOwnedPurchases({
            priceType: PRODUCTS[pType].type
        });
        console.log(message);
    } catch (err) {
        defaultErrorHandler(err);
    }
}


async function getMovies(url) {

    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

function showMovies(movies) {

    main.innerHTML += "";
    var count = 0;
    movies.forEach((movie) => {

        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.style.width = "470px";
        movieEl.style.height = "470px";

        movieEl.innerHTML = `
         <img
                        src="${IMGPATH + poster_path}"
                        alt="${title}"
                    />
                    <div class="movie-info">
                        <h3>${title}</h3>
                    </div>
                     <div>
  						<button id="${count}" type="button" class="btn btn-warning">Buy Movie</button>
                    </div>
        `;

        count++;
        main.appendChild(movieEl);

    });
}



app_movie.initialize();