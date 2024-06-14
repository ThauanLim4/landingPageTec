const hardwares = [
    [
        {
            id: 1,
            name: 'AISURIX Placa gráfica RX 5500 XT 8gb GDDR6, 128 bits,',
            price: 1183.90,
            img: '../components/imgProducts/pdv/rx5500xt.png',
            characteristics: `Marca: AISURIX <br>
            Modelo: RX 5500XT 8G <br>
            Interface do hardware: PCI Express x4 <br>
            Memória de vídeo: 8 GB <br>
            Tipo de memória de vídeo: GDDR6 <br>
            Interface da placa de vídeo: PCI Express <br>
            Peças para montagem: placa de vídeo <br>
            Interface de saída de vídeo: DisplayPort, HDMI <br>
            Potência em watts: 130 Watt-hours <br>
            Peso do produto: 939 g <br>
            Dimensões do produto: 23,93 x 9,5 x 4,04 cm; 939 g  <br>`
        },

        {
            id: 2,
            name: 'MSI GeForce GTX 1650 128-Bit HDMI/DP/DVI 4GB GDRR6',
            price: 939.00,
            img: '../components/imgProducts/pdv/gtx1650.png',
            characteristics: `
            Marca: MSI <br>
            Fabricante: MSI <br>
            Série: GTX 1650 D6 Ventus XS OCV3 <br>
            Cor: Preto <br>
            Altura do produto: 4,41 polegadas <br>
            Largura do produto: 1,65 polegadas
            Velocidade do relógio de memória: 12 GH <br>z
            Modelo de placa de vídeo: NVIDIA GeForce GTX 1650 <br>
            Marca do chipset de vídeo: NVIDIA <br>
            Tipo de memória de vídeo: GDDR6 <br>
            Memória de vídeo: 4 GB
            Interface da placa de vídeo: PCI-Express x16 <br>
            Voltagem: 90 <br>
            Peso do produto: 671 g <br>
            Dimensões do produto: 17,91 x 4,19 x 11,2 cm; 671 g <br> `
        },

        {
            id: 3,
            name: 'Placa de Vídeo Gigabyte - GeForce GTX 1660, 6GB GDDR5',
            price: 1772.70,
            img: '../components/imgProducts/pdv/gtx1660.png',
            characteristics: `
            Tamanho da memória RAM da placa gráfica: 6GB <br>
            Velocidade do clock da GPU: 1830 MHz <br>
            Marca: GIGABYTE <br>
            Cor: Preto <br>
            Altura do produto: 40 milímetros <br>
            Largura do produto: 28 centímetros <br>
            Velocidade do relógio de memória: 1830 MHz <br>
            Modelo de placa de vídeo: NVIDIA GeForce GTX 1660 <br>
            Marca do chipset de vídeo: GIGABYTE <br>
            Tipo de memória de vídeo: GDDR5 <br>
            Memória de vídeo: 6 <br>
            Interface da placa de vídeo: PCI Express <br>
            Potência em watts: 450 watts <br> `
        }
    ],

    [
        {
            id: 1,
            name: 'Processador Intel Core I5-12400F 2.5GHZ (Turbo 4.4GHZ) Cache 18MB 6 Núcleos 12 Threads 12ª Ger LGA 1700',
            price: 919.90,
            img: '../components/imgProducts/cpu/i5-12400f.png'
        },
    
        {
            id: 2,
            name: 'Processador AMD Ryzen 5 5600G, 3.9GHz (4.4GHz Max Turbo), AM4, Vídeo Integrado, 6 Núcleos',
            price: 833.25,
            img: '../components/imgProducts/cpu/r5-5600g.png'
        },
    
        {
            id: 3,
            name: 'PROCESSADOR AMD RYZEN 7 5700X 3.4GHz (TURBO 4.6GHz) AM4, Cerâmica cinza ',
            price: 1129.90,
            img: '../components/imgProducts/cpu/r7-5700x.png'
        },
    ],

    [
        {
            id: 1,
            name: 'Placa Mãe Gigabyte A520M S2H DDR4, AMD, AM4',
            price: 579.90,
            img: '../components/imgProducts/mboard/a520h-s2.png'
        },
    
        {
            id: 2,
            name: 'Placa Mãe Gigabyte B450M DS3H V2',
            price: 588.00,
            img: '../components/imgProducts/mboard/B450M-DS3H-V2.png'
        },
    
        {
            id: 3,
            name: 'Placa Mãe Gigabyte B550M AORUS Elite, Chipset B550, AMD AM4, mATX, DDR4',
            price: 729.98,
            img: '../components/imgProducts/mboard/b550m.png'
        },
    
    ],

    [
        {
            id: 1,
            name: 'HD Seagate BarraCuda, 1TB, 3.5, SATA',
            price: 317.90,
            img: '../components/imgProducts/armaz/hd-1TB.png'
        },
        
        {
            id: 2,
            name: 'SSD Kingston NV2 500GB NVMe M.2 2280 ',
            price: 312.00,
            img: '../components/imgProducts/armaz/nvme-500gb.png'
        },
        
        {
            id: 3,
            name: 'HD SSD Kingston SA400S37 480GB ',
            price: 259.90,
            img: '../components/imgProducts/armaz/ssd.png'
        },
        
    ],

    [
        {
            id: 1,
            name: 'Gabinete Gamer Pichau HX300M Glass, Mid-tower, Lateral de Vidro, Branco',
            price: 258.90,
            img: '../components/imgProducts/gabinete/hx300.png'
        },
        
        {
            id: 2,
            name: 'GABINETE MICRO ATX SEM FONTE F02 PRETO BRX ',
            price: 100.69,
            img: '../components/imgProducts/gabinete/brx.png'
        },
        
        {
            id: 3,
            name: 'Gabinete Redragon Wideload Pro CA-604B-PRO',
            price: 389.98,
            img: '../components/imgProducts/gabinete/CA-604B-PRO.png'
        },
        
    ],

    [
        {
            id: 1,
            name: 'Corsair FONTE ATX 750W - CV750-80 PLUS BRONZE - COM CABO DE FORÇA',
            price: 789.90,
            img: '../components/imgProducts/fontes/cv750w.png'
        },
        
        {
            id: 2,
            name: 'Fonte de Alimentação Redragon 500W 80 Plus Bronze PFC Ativo S/Cabo',
            price: 314.39,
            img: '../components/imgProducts/fontes/reddragon-500w.png'
        },
        
        {
            id: 3,
            name: 'FONTE ATX 650W - CV650-80 PLUS BRONZE - COM CABO DE FORCA',
            price: 449.00,
            img: '../components/imgProducts/fontes/cv650w.png'
        },
    ],

    [
        {
            id: 1,
            name: 'Monitor AOC 23,8',
            price: 539.10,
            img: '../components/imgProducts/monitores/aoc23.png'
        },
        
        {
            id: 2,
            name: 'AOC Hero 27" - Monitor Gamer, 144Hz IPS 1ms G-Sync Compatible 27G2, Preto ',
            price: 1299.00,
            img: '../components/imgProducts/monitores/aoc-hero27.png'
        },
        
        {
            id: 3,
            name: 'Samsung T350 - Monitor Gamer, 24", FHD, 75Hz, HDMI, VGA, Freesync, Preto ',
            price: 609.00,
            img: '../components/imgProducts/monitores/t350.png'
        },
        
    ],

    [
        {
            id: 1,
            name: 'Caixa de Som Gamer Redragon Anvil RGB Branco - GS560W',
            price: 339.90,
            img: '../components/imgProducts/som/gs560w.png'
        },
        
        {
            id: 2,
            name: 'CX DE SOM SOUNDBAR GAMER REDRAGON ADIEMUS - GS560 ',
            price: 369.00,
            img: '../components/imgProducts/som/gs560.png'
        },
        
        {
            id: 3,
            name: 'C3Tech Caixa de som SP-301BK Preto - Sistema de audio 2.0 P2 Com Blindagem Eletromagnética alimentacao via porta USB ',
            price: 24.90,
            img: '../components/imgProducts/som/g3tech.png'
        },
    ],

    [
        {
            id: 1,
            name: 'Redragon TECLADO MECANICO GAMER FIZZ RGB PRETO SWITCH MARROM',
            price: 208.44,
            img: '../components/imgProducts/perifericos/redDragon-fizz.png'
        },
        
        {
            id: 2,
            name: 'Mouse Gamer Logitech G203 LIGHTSYNC RGB, Efeito de Ondas de Cores, 6 Botões Programáveis e Até 8.000 DPI - Preto ',
            price: 149.88,
            img: '../components/imgProducts/perifericos/Logitech-G203.png'
        },
        
        {
            id: 3,
            name: 'Headphone Fone de Ouvido Havit HV-H2002d, Gamer, com Microfone, Falante 53mm, Plug 3.5mm',
            price: 175.98,
            img: '../components/imgProducts/perifericos/havit-hv-h2002d.png'
        },
        
    ]

]

let [placasDeVideo, cpu, placaMae, armazenamento, gabinete, fontes, perifericos, monitores, som] = hardwares

