from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Cargar los datos desde el archivo JSON
data = pd.read_json('Base_de_datos_de_Pymes_en_Colombia_20241218.json')

# Configuración de paginación
ENTRADAS_POR_PAGINA = 100

@app.route('/')
def index():
    # Obtener el número de página de la solicitud
    pagina = request.args.get('pagina', 1, type=int)
    inicio = (pagina - 1) * ENTRADAS_POR_PAGINA
    fin = inicio + ENTRADAS_POR_PAGINA
    datos_paginados = data.iloc[inicio:fin]

    total_paginas = (len(data) + ENTRADAS_POR_PAGINA - 1) // ENTRADAS_POR_PAGINA

    return render_template('index.html', data=datos_paginados.to_dict(orient='records'), pagina=pagina, total_paginas=total_paginas)

if __name__ == '__main__':
    app.run(debug=True)
