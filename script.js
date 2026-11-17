document.addEventListener('DOMContentLoaded', function() {
    let printLists, pricePapper = 0, priceStart = 0, pricePrint = 0, result = 0;
    let color_format = '', color_format_old = '';
    let typePapper = {
        '': 0,
        'Мелованная бумага': 6.8,
        'Бумага повышенной белизны': 40.5,
        'Льняная бумага': 45
    };
    let typeColor = {
        '': {file: 0, print: 0},
        'Односторонняя черно-белая': {file: 110, print: 14},
        'Двусторонняя черно-белая': {file: 220, print: 28},
        'Односторонняя цветная': {file: 110, print: 37},
        'Цветная с лицевой, ч/б с оборотной': {file: 220, print: 51},
        'Двусторонняя цветная': {file: 220, print: 74}
    };
    function insertPapper() {
        let html = '';
        for (let type in typePapper)
            html += '<option value="' + type + '">' + type + '</option>';
        document.getElementById('card-paper').insertAdjacentHTML('beforeend', html);
    }
    insertPapper();
    function insertColor() {
        let html = '';
        for (let type in typeColor)
            html += '<option value="' + type + '">' + type + '</option>';
        document.getElementById('card-color').insertAdjacentHTML('beforeend', html);
    }
    insertColor();
    let calcElements = document.querySelectorAll('.calc');
    calcElements.forEach(function(el) {
        el.addEventListener('change', function() {
            printLists = document.getElementById('card-quantity').value / 30;
            pricePapper = typePapper[document.getElementById('card-paper').value] * printLists;
            color_format_old = color_format;
            color_format = document.getElementById('card-color').value;
            priceStart = typeColor[color_format]['file'];
            pricePrint = typeColor[color_format]['print'] * printLists;
            result = pricePapper + priceStart + pricePrint;
            document.getElementById('final-price').textContent = result;
            if (color_format != color_format_old) {
                document.querySelectorAll('img').forEach(function(img) {
                    img.style.display = 'none';
                });
                let showId = null;
                if (color_format == 'Односторонняя черно-белая')
                    showId = 'card_1_0';
                if (color_format == 'Двусторонняя черно-белая')
                    showId = 'card_1_1';
                if (color_format == 'Односторонняя цветная')
                    showId = 'card_4_0';
                if (color_format == 'Цветная с лицевой, ч/б с оборотной')
                    showId = 'card_4_1';
                if (color_format == 'Двусторонняя цветная')
                    showId = 'card_4_4';
                if (showId) {
                    let el = document.getElementById(showId);
                    el.style.display = 'block';
                    el.style.transition = 'opacity 0.4s';
                    el.style.opacity = '0';
                    requestAnimationFrame(function() {
                        el.style.opacity = '1';
                    });
                }
            }
        });
    });
});