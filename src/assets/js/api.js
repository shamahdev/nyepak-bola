import { getAll, getById } from "./db.js";
import * as notavailable from '../img/notavailable.jpg';

const base_url = "https://api.football-data.org/";
const token = "e1ba33b79a3a415fa73ff007a605023f";

const status = (response) => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
const json = (response) => {
  return response.json();
}
const error = _ => {
  M.toast({html: 'Anda sedang offline, data akan ditampilkan melalui cache yang tersedia'})
}
const renderLeagues = (data) => {
  let leaguesHTML = "";
  data.competitions.forEach(competition => {
    const areaEnsign = competition.area.ensignUrl || notavailable.default;
    leaguesHTML += `
          <li class="mb1 collection-item avatar rounded waves-effect waves-block hoverable">
          <a class="black-text" href="./leagues.html?id=${competition.id}">
          <span class="badge" data-badge-caption="">${competition.area.name}</span>
          <img src="${areaEnsign}" alt="${competition.area.name}" class="responsive-img fit-cover circle"/>
          <b class="title">${competition.name}</b>
          <p>${competition.numberOfAvailableSeasons} Seasons</p>
          <p>${competition.currentSeason.currentMatchday} Matches</p>
          </a>
        </li>
          `;
  });
  leaguesHTML += `<p class="p1 grey-text center-align">Total Liga: ${data.count}</p>`;
  document.getElementById("leagues").innerHTML = leaguesHTML;
}
const renderLeagueById = (data) => {
  let detailHTML = "";
  detailHTML += `
  <div class="row pt2 blue rounded-bottom">
    <div class="px3 center-align mb2 white-text">
      <h5>Klasemen Liga</h5>
      <p>Liga ${data.competition.name}</p>
    </div>  
  </div>
  <div class="row container">
    <div class="col s12">
        <ul class="collection" id="competition">`;

  data.standings[0].table.forEach(standing => {
    const teamCrest = standing.team.crestUrl || notavailable.default;
    detailHTML += `
          <li class="mb1 collection-item avatar rounded waves-effect waves-block hoverable">
          <a class="black-text" href="./team.html?id=${standing.team.id}">
          <span class="badge" data-badge-caption="Points">${standing.points}</span>
          <div class="standing">
            <span class="new badge orange rounded" data-badge-caption="">${standing.position}</span>
            <img src="${teamCrest}" alt="${standing.team.name}" class="responsive-img fit-scaledown circle no-radius"/>
          </div>
          <b class="title">${standing.team.name}</b>
          <p>Won/Draw/Lost: ${standing.won}/${standing.draw}/${standing.lost}</p>
          <p>Total Games: ${standing.playedGames}</p>
          </a>
        </li>
          `;
  })
  detailHTML += `
  </ul>
  </div>
  </div>`
  document.getElementById("leagues-id").innerHTML = detailHTML;
}
const renderMatches = (data) => {
  let matchesHTML = "";
  data.matches.forEach(matches => {
    matchesHTML += `
          <li class="mb1 collection-item avatar rounded">
          <img src="${matches.competition.area.ensignUrl}" alt="${matches.homeTeam.name}" class="responsive-img fit-cover circle"/>
          <b class="title">${matches.homeTeam.name} vs ${matches.awayTeam.name}</b>
          <p class="mb1"><b>Start</b> ${matches.season.startDate} <b>End</b> ${matches.season.endDate}</p>
          <a class="blue rounded p1 white-text waves-effect" href="./leagues.html?id=${matches.competition.id}">${matches.competition.name}</a>
        </li>
          `;
  });
  matchesHTML += `<p class="p1 grey-text center-align">Total Pertandingan: ${data.count}</p>`;
  document.getElementById("matches").innerHTML = matchesHTML;
}
const renderTeam = (data) => {
  const teamCrest = data.crestUrl || notavailable.default;
  let teamHTML = "";
  teamHTML += `
  <div class="row pt2 blue rounded-bottom">
    <div class="px3 center-align mb2 white-text">
      <h5>Liga ${data.name}</h5>
      <p>${data.area.name}</p>
    </div>  
  </div>
  <div class="row container">
    <div class="col s12 m3 center-align mb2">
      <img class="responsive-img center-align crest" alt="${data.name}" src="${teamCrest}" />
    </div>
    <div class="col s6 m4">
      <p><b>Nama Tim:</b><br>${data.name} / ${data.shortName}</p>
      <p><b>Arena/Stadion:</b><br>${data.venue}</p>
      <p><b>Tanggal Didirikan:</b><br>${data.founded}</p>
      <p><b>Warna Tim:</b><br>${data.clubColors}</p>
    </div>
    <div class="col s6 m5 break-word">
      <p><b>Lokasi:</b><br>${data.address}</p>
      <p><b>Website:</b><br><a href="${data.website}">${data.website}</a></p>
      <p><b>Nomor Telepon:</b><br>${data.phone}</p>
      <p><b>Email:</b><br>${data.email}</p>
    </div>
    <div class="col s12">
    <h5 class="mb1">Pemain</h5>
    <table class="striped">
    <thead>
      <tr>
          <th>Nama</th>
          <th>Posisi</th>
          <th>Tempat Tinggal</th>
      </tr>
    </thead>
    <tbody>`;

  data.squad.forEach(player => {
    teamHTML += `<tr>
    <td>${player.name}</td>
    <td>${player.position}</td>
    <td>${player.countryOfBirth}</td>
  </tr>`;
  })
  teamHTML += `
  </tbody>
  </table>
  </div>
  </div>`
  document.getElementById("team").innerHTML = teamHTML;
}
const renderSavedTeams = (data) => {
  let teamsHTML = "";
  if (data.length > 0) {
    data.forEach(team => {
      const teamCrest = team.crestUrl || notavailable.default;
      teamsHTML += `
            <li class="mb1 collection-item avatar rounded waves-effect waves-block hoverable">
            <a class="black-text" href="./team.html?id=${team.id}&favorited=true">
            <span class="badge" data-badge-caption="">${team.area.name}</span>
            <div class="standing">
              <img src="${teamCrest}" alt="${team.name}" class="responsive-img fit-scaledown circle no-radius"/>
            </div>
            <b class="title">${team.name}</b>
            <p>Founded: ${team.founded}</p>
            <p>Team Colors: ${team.clubColors}</p>
            </a>
          </li>
            `;
    })
  } else {
    teamsHTML += `<p class="center-align px3 mt2">Anda belum menambahkan apapun ke dalam list favorit anda.</p>`;
  }
  document.getElementById("favorite").innerHTML = teamsHTML;
}
const getLeagues = () => {
  if ('caches' in window) {
    caches.match(`${base_url}v2/competitions?plan=TIER_ONE&areas=2072,2163,2224`).then(response => {
      if (response) {
        response.json().then(renderLeagues);
      }
    })
  }
  fetch(`${base_url}v2/competitions?plan=TIER_ONE&areas=2072,2163,2224`, {
      headers: {
        'X-Auth-Token': token
      },
    })
    .then(status)
    .then(json)
    .then(renderLeagues)
    .catch(error)
}
const getLeagueById = (id = 0) => {
  return new Promise(function (resolve, reject) {

    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id") || id;

    if ("caches" in window) {
      caches.match(`${base_url}v2/competitions/${idParam}/standings`).then(response => {
        if (response) {
          response.json().then(renderLeagueById);
        }
      })
    }
    fetch(`${base_url}v2/competitions/${idParam}/standings`, {
        headers: {
          'X-Auth-Token': token
        }
      })
      .then(status)
      .then(json)
      .then(data => {
        renderLeagueById(data);
        resolve(data);
      })
      .catch(error)
  })
}
const getMatches = () => {
  if ('caches' in window) {
    caches.match(`${base_url}v2/matches?status=SCHEDULED`).then(response => {
      if (response) {
        response.json().then(renderMatches);
      }
    })
  }
  fetch(`${base_url}v2/matches?status=SCHEDULED`, {
      headers: {
        'X-Auth-Token': token
      },
    })
    .then(status)
    .then(json)
    .then(renderMatches)
    .catch(error)
}
const getTeamById = (id = 0) => {
  return new Promise(function (resolve, reject) {

    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id") || id;

    if ("caches" in window) {
      caches.match(`${base_url}v2/teams/${idParam}`).then(response => {
        if (response) {
          response.json().then(renderTeam);
        }
      })
    }
    fetch(`${base_url}v2/teams/${idParam}`, {
        headers: {
          'X-Auth-Token': token
        }
      })
      .then(status)
      .then(json)
      .then(data => {
        renderTeam(data);
        resolve(data);
      })
      .catch(error)
  })
}
const getSavedTeams = () => {
  getAll()
    .then(renderSavedTeams)
    .catch(error)
}
const getSavedTeamById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get("id");
  getById(parseInt(teamId))
    .then(renderTeam)
    .catch(() => {
      document.getElementById("team").innerHTML =
        `<div class="row pt2 blue rounded-bottom">
    <div class="px3 center-align mb2 white-text">
      <h5>Liga tidak ada</h5>
    </div>  
  </div>
  <p class="center-align px3 mt2">Tim favorit yang anda cari tidak ada, <a href="./index.html#favorite">kembali ke list favorit.</a></p>`
    })
}

export {
  getLeagues,
  getLeagueById,
  getMatches,
  getTeamById,
  getSavedTeams,
  getSavedTeamById
};