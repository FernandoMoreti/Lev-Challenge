import { test, expect } from '@playwright/test';

test("Demonstração de navegação e preenchimento de input", async ({ page }) => {

    // Navega na pagina tal
    await page.goto('https://sidra.ibge.gov.br/');

    //CLica no icone de login com referencia no class css
    await page.click('.areausuario-li');

    // Aguarda o input aparecer
    await page.waitForSelector('input[placeholder="E-mail"]');

    //Coloca senha e email
    await page.fill('input[placeholder="E-mail"]', 'fernandombolela@gmail.com')
    await page.fill('input[placeholder="Senha"]', 'Fer2908@')

    // Clica no logar
    await page.click('text=Entrar');

    // Espera o overlay carregar
    await page.waitForSelector('.m2-overlay');

    // Tira o overlay e clica na lupa
    await page.click(".m2-overlay");
    await page.click(".lupa-li")

    await page.waitForSelector(`#sidra-pesquisa-lg`);

    await page.fill('#sidra-pesquisa-lg input[placeholder="pesquisar"]', '1209');

    await page.click('#sidra-pesquisa-lg button[class="btn btn-default"]')

    await page.waitForSelector('.editor-panels');

    await page.click('.lv-block .lv-data .item-lista[data-indice="12"] .sidra-check .sidra-toggle');
    await page.click('.lv-block .lv-data .item-lista[data-indice="13"] .sidra-check .sidra-toggle');

    // Tira um print pra eu saber como esta
    await page.screenshot({ path: 'print.png' });

})