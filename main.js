const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Idziesz przez pusty korytarz i móiwsz pod nosem: "Jak dobrze, gdy nie jest tak ciasno. Nikt by się nie obraził, gdyby liczbę uczniów zmniejszyć o połowę!"',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Ledwo wypowiedziałeś te słowa, a przed Tobą otworzył się portal!',
        tlo: 'url("img/Portal.png")',
        options: [
            {
                text: 'Dalej',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Z portalu wychodzi... Marthanos! "Czy ktoś tu chce zmniejszyć populację?"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: '"Kim jesteś?" (rozmowa)',
                nextText: "Kim_jesteś"
            },
            {
                text: '"Nie, nie, ja tylko tak powiedziałem! Nie chcę nikogo zabijać! Tak napradwę to próbuję przywrócić uczniów!" (rozmowa)',
                nextText: "Pacyfizm"
            },
            {
                text: '"Tak, tak, tak! Pomóżesz mi przywrócić tylko połowę uczniów?" (rozmowa)',
                nextText: "Depopulacja"
            },
            {
                text: '"Wow! Czy to rękawica nieskonczoności?!" (rozmowa)',
                nextText: "Rękawica"
            }
        ]
    },
    {
        id: "Kim_jesteś",
        text: '"Jestem Marthanos - szalona tytanka! Pilnuję równowagi we wrzechświecie i równowagi ekosystemu! A ty?"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: '"Jestem obrońcą tej szkoły! Próbuję odczarować zły urok!" (rozmowa)',
                nextText: "Pomoc"
            },
            {
                text: '"Jestem obrońcą tej szkoły! Fajnie jest pomarzyć, ale nie pozwolę nikogo zlikwidować!" (rozmowa)',
                nextText: "Pacyfizm"
            },
            {
                text: '"Pomóżesz mi przywrócić tylko połowę uczniów?" (rozmowa)',
                nextText: "Depopulacja"
            },
            {
                text: '"Zaraz, zaraz! Szalona tytanka? Czy to co trzymasz to rękawica nieskonczoności?" (rozmowa)',
                nextText: "Rękawica"
            }
        ]
    },
    {
        id: "Pomoc",
        text: '"Zły urok mówisz? Może mogę jakoś pomóc? Nie za darmo oczywiście..."',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: 'Zaoferuj kanapkę! (daj prezent)',
                nextText: "Jedzenie"
            },
            {
                text: 'Zaoferuj żelki Haribo! (daj prezent)',
                nextText: "Jedzenie"
            },
            {
                text: 'Zaoferuj kamyczki! (daj prezent)',
                nextText: "Kamyczki"
            },
            {
                text: 'Zaoferuj kupon na trzy lekcje Koreańskiego! (daj prezent)',
                nextText: "Koreański"
            }
        ]
    },
    {
        id: "Rękawica",
        text: '"Rękawica to najpotężniejszy artefakt w historii tego uniwersum, silniejszy jest chyba tylko Dy-Roo."',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: '"To właśnie z Dy-Roo walczymy! Pomóż nam, serio jest taki silny?" (rozmowa)',
                nextText: "Sukces3"
            },
            {
                text: '"A co, gdybyś miała więcej kamieni? Może byłabyś silniejsza od Dy-Raa?" Zaoferuj kamyczki! (daj prezent)',
                nextText: "Kamyczki"
            },
            {
                text: '"Serio Dy-Roo jest silniejszy nawet od Ciebie, może źle używasz rękawicy? (rozmowa)',
                nextText: "Atak"
            },
            {
                text: '"Dy-Roo silniejszy od Ciebie? Dobra, widać, że nie umiesz posługiwać się rękawicą, w moich rękach będzie z niej lepszy użytek!" (atak)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Atak",
        text: 'Marthanos jednym pstryknieciem zmienia Cię w galaretkę. "Serio? A wydawałeś się taki fajny... Przemyśl swoje zachowanie, za 15 min wrócisz do siebie, ja uciekam, żegnaj!" Zmarnowałeś świetną okazję...',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: 'Odczekaj 15 min i zagraj jeszcze raz... galaretko.',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Jedzenie",
        text: '"Mmmm, dziękuję, jesteś bardzo miły, ale rękawica daje mi jakie tylko zechcę jedzenie!"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: '"Masz na myśli... Rękawicę Nieskonczoności?" (rozmowa)',
                nextText: "Rękawica"
            }
        ]
    },
    {
        id: "Koreański",
        text: 'Marthanos próbuje ukryć zażenowanie. "Mmmm, dziękuję, jesteś bardzo miły, ale znam już Koreański!"',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Rozumiem, pewnie rękawica pozwala Ci rozumieć języki obce... Czy to ją masz na ręce?" (rozmowa)',
                nextText: "Rękawica"
            },
            {
                text: '"Rozumiem, nie trzeba kłamać, też nie lubię koreańskiego, bezużyteczny kupon..." (rozmowa)',
                nextText: "Atak"
            }
        ]
    },
    {
        id: "Kamyczki",
        text: '"CZY TY POWIEDZIAŁEŚ KAMYCZKI?! ULUBIONE SŁODYCZE ZDOBYWCY KAMIENI? POPROSZĘ!"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: 'Dajesz kamyczki Marthanosowi. (daj prezenet)',
                nextText: "Sukces"
            }
        ]
    },
    {
        id: "Pacyfizm",
        text: '"Spokojnie, spokojnie, wydajesz się w porządku, a ja przybywam w pokoju. Może mogę Ci jakoś pomóc <obrońco>? haha"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: 'Czy to rękawica nieskonczoności? (rozmowa)',
                nextText: "Rękawica"
            }
        ]
    },
    {
        id: "Depopulacja",
        text: '"Zaraz zaraz... Ty mówisz o depopulacji... ludzi! O nie! Ja nie jestem Thanos, tylko Marthanos!"',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"A to jest jakaś różnica?" (rozmowa)',
                nextText: "Depopulacja2"
            }
        ]
    },
    {
        id: "Depopulacja2",
        text: '"NO WIESZ? Thanos zabijał ludzi, a ja zabijam gołębie! Jak ja nienawidzę gołębi...',
        tlo: 'url("img/Smutna.png")',
        options: [
            {
                text: '"Mmm, okej. I to do tego użwasz rękawicy?" (rozmowa)',
                nextText: "Rękawica"
            }
        ]
    },
    {
        id: "Sukces",
        text: 'Marthanos pochłania kamyczki i wyraźnie rośnie w siłę. "Dziękuję Ci bardzo, jak mogę się odwdzięczyć?"',
        tlo: 'url("img/Szczęśliwa.png")',
        options: [
            {
                text: '"Próbuję przywrócić uczniów z powrotem, ale czy oni jeszcze żyją?" (rozmowa)',
                nextText: "Sukces2"
            }
        ]
    },
    {
        id: "Sukces2",
        text: '"Wszyscy Twoi rówieśnicy zostali przeniesieni do holenderskiej papierni przez... O nie! Dy-Roo?"',
        tlo: 'url("img/Zła.png")',
        options: [
            {
                text: '"Znasz Dy-Roo?" (rozmowa)',
                nextText: "Sukces3"
            }
        ]
    },
    {
        id: "Sukces3",
        text: '"Tak, jest potężniejszy nawet ode mnie. Słuchaj, jeśli go pokonasz to przywrócę uczniów, ale póki co ucikam, powodzenia!"',
        tlo: 'url("img/Portal.png")',
        options: [
            {
                text: '"Czekaj!" (rozmowa)',
                nextText: "Sukces4"
            }
        ]
    },
    {
        id: "Sukces4",
        text: 'Portal znika. Nie tylko jesteś bezpieczny ale też zyskałeś sojusznika! Teraz musisz tylko ubić bestię...',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Zagraj ponownie',
                nextText: "Start1"
            }
        ]
    }
]

startGame()