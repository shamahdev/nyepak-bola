import M from "./vendor/materialize.min.js";
import { getLeagues, getLeagueById, getMatches, getTeamById, getSavedTeams, getSavedTeamById } from "./api.js";
import { saveForLater, deleteFromSave, getById } from "./db.js";

let page = window.location.hash.substr(1);
const content = document.querySelector("#body-content");
const elems = document.querySelectorAll('.sidenav');

const loadNav = _ => {
	fetch(`./pages/nav.html`)
		.then(res => {
			return res.text();
		})
		.then(resText => {
			document.querySelectorAll(".topnav.hide-on-med-and-down, .sidenav").forEach(elm => {
				elm.innerHTML = resText;
			});
			document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
				elm.addEventListener("click", event => {
					// Tutup sidenav
					const sidenav = document.querySelector(".sidenav");
					M.Sidenav.getInstance(sidenav).close();

					// Muat konten halaman yang dipanggil
					page = event.currentTarget.getAttribute("href").substr(1);
					loadPage(page);
				});
			});
		})
		.catch(error => {
			content.innerHTML = `<p>Page error to load. ${error}</p>`;
		});
}
const loadPage = page => {
	fetch(`./pages/${page}.html`)
		.then(res => {
			return res.text();
		})
		.then(resText => {
			content.innerHTML = resText;
			content.querySelectorAll(".carousel-item a").forEach(elm => {
				elm.addEventListener("click", event => {
					// Tutup sidenav
					const sidenav = document.querySelector(".sidenav");
					M.Sidenav.getInstance(sidenav).close();
					// Muat konten halaman yang dipanggil
					page = event.currentTarget.getAttribute("href").substr(1);
					loadPage(page);
				});
			});
			const favNav = document.getElementById('fav');
			favNav.style.display = 'block';
			const slideCarousel = () => {
				const carousel = document.querySelector('.carousel');
				M.Carousel.init(carousel, {
					fullWidth: true,
					indicators: true
				});
				window.setInterval(() => {
					M.Carousel.getInstance(carousel).next();
				}, 4500);
			}
			if (page === "home") {
				getLeagues();
				getMatches();
				slideCarousel();
			} else if (page === "browse") {
				getLeagues();
			} else if (page === "matches") {
				getMatches();
			} else if (page === "favorite") {
				favNav.style.display = 'none';
				getSavedTeams();
			}
		})
		.catch((err) => {
			console.log(err);
			M.toast({
				html: 'Halaman yang anda cari tidak dapat ditemukan'
			})
		});
}
const router = _ => {
	const thisPage = window.location.pathname.substr(1);
	if (thisPage === 'leagues.html') {
		getLeagueById();
	} else if (thisPage === 'team.html') {
		const urlParams = new URLSearchParams(window.location.search);
		const teamId = urlParams.get("id");
		const isFavorite = urlParams.get("favorited");
		const fav = document.getElementById("favBtn");
		let faved;

		const checkFavorite = () => {
			getById(parseInt(teamId))
				.then((result) => {
					if (typeof result === 'undefined') {
						fav.querySelector("i").innerHTML = "favorite_border";
						faved = false;
					} else {
						fav.querySelector("i").innerHTML = "favorite";
						faved = true;
					}
				})
		}

		if (isFavorite) {
			getSavedTeamById();
		} else {
			getTeamById();
		}
		checkFavorite();

		fav.onclick = () => {
			getTeamById().then(team => {
				if (faved) {
					deleteFromSave(team);
				} else {
					saveForLater(team);
				}
				checkFavorite();
			});
		}
	} else {
		if (page === '') {
			page = 'home';
		}
		M.Sidenav.init(elems);
		loadNav();
		loadPage(page);
	}
};

export default router;