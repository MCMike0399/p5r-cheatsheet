import requests
from bs4 import BeautifulSoup
import json

# Diccionario que mapea los nombres de los confidants con sus respectivas URLs.
confidants_urls = {
    'Ryuji_Sakamoto': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-chariot-ryuji-sakamoto/370379',
    'Takuto_Maruki': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-councillor-takuto-maruki/370462',
    'Tae_Takemi': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-death-tae-takemi/370389',
    'Ichiko_Ohya': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-devil-ichiko-ohya/370393',
    'Yusuke_Kitagawa': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-emperor-yusuke-kitagawa/370403',
    'Haru_Okumura': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-empress-haru-okumura/370417',
    'Kasumi_Yoshizawa': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-faith-kasumi-yoshizawa/370469',
    'Chihaya_Mifuine': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-fortune-chihaya-mifune/370421',
    'Munehisa_Iwai': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-hanged-munehisa-iwai/370427',
    'Futaba_Sakura': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-hermit-futaba-sakura/370430',
    'Sojiro_Sakura': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-hierophant-sojiro-sakura/370433/',
    'Goro_Akechi': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-justice-goro-akechi/370472',
    'Ann_Takamaki': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-lovers-ann-takamaki/370436',
    'Yuuki_Mishima': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-moon-yuuki-mishima/370439',
    'Makoto_Nijima': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-priestess-makoto-niijima/370442',
    'Hifumi_Togo': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-star-hifumi-togo/370447',
    'Toranosuke_Yoshida': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-sun-toranosuke-yoshida/370452',
    'Sadayo_Kawakami': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-temperance-sadayo-kawakami/370456',
    'Shinya_Oda': 'https://hardcoregamer.com/features/persona-5-royal-confidant-guide-tower-shinya-oda/370459'
}

# Headers para la solicitud HTTP, para simular un navegador y evitar bloqueos por parte del servidor.
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

print("Iniciando Web Scrapping de Confidants...")
# Iterar sobre cada confidant y su URL en el diccionario.
for confidant_name, url in confidants_urls.items():
    print("Creando del confidant ", confidant_name)
    # Realizar la solicitud HTTP a la URL.
    response = requests.get(url, headers=headers)

    # Analizar el contenido HTML de la respuesta.
    soup = BeautifulSoup(response.text, 'html.parser')

    # Lista para almacenar los datos de cada confidant.
    confidants_data = []

    # Buscar todos los elementos <h2> en el HTML (se asume que representan los rangos de los confidants).
    ranks = soup.find_all('h2')

    # Iterar sobre cada elemento <h2> encontrado.
    for rank in ranks:
        # Verificar si el elemento <h2> contiene un ID relacionado con 'rank'.
        if 'rank' in rank.get('id', ''):
            # Crear un diccionario para almacenar la información de este rango.
            rank_data = {
                'rank': rank.text.strip(),
                'responses': []
            }
            # Encontrar la tabla de respuestas que sigue inmediatamente al rango actual.
            table_container = rank.find_next('div', class_='table-container')
            
            if table_container: # Verificar que se encontró el contenedor de la tabla
               table = table_container.find('table')
               if table:  # Verificar que se encontró la tabla
                  # Obtener todas las filas (tr) de la tabla.
                  rows = table.find_all('tr')
                  for row in rows:
                     # Diccionario para almacenar la respuesta y sus valores.
                     response_data = {
                        'response': '',
                        'values': []
                     }

                     # Obtener todas las celdas (td) en la fila actual.
                     cells = row.find_all('td')

                     # La primera celda contiene el texto de la respuesta.
                     response_data['response'] = cells[0].get_text(strip=True)

                     # Las celdas restantes contienen los valores numéricos asociados con la respuesta.
                     for cell in cells[1:]:
                        text = cell.get_text(strip=True)
                        if text:  # Solo añadir si la celda contiene texto.
                              response_data['values'].append(text)

                     # Añadir los datos de la respuesta al rango actual.
                     rank_data['responses'].append(response_data)

            # Añadir el diccionario del rango a la lista de datos del confidant.
            confidants_data.append(rank_data)

    # Convertir la lista de datos del confidant a formato JSON.
    json_data = json.dumps(confidants_data, ensure_ascii=False, indent=2)

    # Guardar los datos en un archivo JSON, nombrado según el confidant.
    with open(f'{confidant_name}.json', 'w', encoding='utf-8') as file:
        file.write(json_data)
        print("JSON creado correctamente :) de ", confidant_name)
