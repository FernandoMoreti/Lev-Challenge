import { test } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

async function login(page, email, senha) {
    
    // Clica no icone de usuario
    await page.click('.areausuario-li');

    // Aguarda o input aparecer
    await page.waitForSelector('input[placeholder="E-mail"]');

    //Coloca senha e email
    await page.fill('input[placeholder="E-mail"]', email)
    await page.fill('input[placeholder="Senha"]', senha)

    // Clica no logar
    await page.click('text=Entrar');

}

test("Automatizando a extração de dados do IBGE > 60 anos com login", async ({ page }) => {

    try {

        // Navega na pagina tal
        await page.goto('https://sidra.ibge.gov.br/');
    
        await login(page, process.env.USER_EMAIL, process.env.PASSWORD);
    
        // Espera o overlay carregar
        await page.waitForSelector('.m2-overlay');
    
        // Tira o overlay e clica na lupa
        await page.click(".m2-overlay");
        await page.click(".lupa-li")
    
        // Espera o input aparecer
        await page.waitForSelector(`#sidra-pesquisa-lg`);
    
        // Preenche o input
        await page.fill('#sidra-pesquisa-lg input[placeholder="pesquisar"]', '1209');
    
        // Clica no botao para pesquisar
        await page.click('#sidra-pesquisa-lg button[class="btn btn-default"]')
    
        // Aguarda a pagina carregar
        await page.waitForSelector('.editor-panels');
    
        // Desmarca todos os campos
        await page.locator('button[data-cmd="desmarcarTudo"]').nth(1).click()
        
        // Clica no filtro de 60 anos ou mais
        await page.click('.lv-block .lv-data .item-lista[data-indice="12"] .sidra-check .sidra-toggle');
        await page.click('.lv-block .lv-data .item-lista[data-indice="13"] .sidra-check .sidra-toggle');
        
        // Retira o filtro brasil e coloca estados
        await page.click('#wrapper-arvore #arvore-niveis #arvore-355e-1 .item-arvore .nome-arvore .sidra-check .sidra-toggle');
        await page.click('#wrapper-arvore #arvore-niveis #arvore-435e-1 .item-arvore .nome-arvore .sidra-check .sidra-toggle');
    
        // CLica no botão downloads
        await page.click('#botao-downloads');
    
        // Espera o modal de downloads aparecer
        await page.waitForSelector('#modal-downloads')
    
        // Preenche o nome do arquivo
        await page.fill('#download-form .tabela-opcoes input[placeholder="tabela1209"]', 'populacao_60mais_1209')
        
        // Seleciona o formato do arquivo
        await page.selectOption('#download-form .tabela-opcoes .select-formato-arquivo', { value: 'br.csv' });
    
        // Clica para realizar o download
        await page.click('.div-download-button #opcao-downloads')
    
        // Crio uma constante para armazenar meu download
        const donwload = await page.waitForEvent('download');
    
        // Salvo o mesmo em uma pasta
        await donwload.saveAs('downloads/dados/populacao_60mais_1209.csv');

    } catch (error) {

        console.error("Erro ao executar o teste: ", error);

    }

})

test("Automatizando a extração de dados do IBGE > 60 anos sem login", async ({ page }) => {

    try {

        // Navega na pagina tal
        await page.goto('https://sidra.ibge.gov.br/');
        
        await page.click(".lupa-li")
    
        // Espera o input aparecer
        await page.waitForSelector(`#sidra-pesquisa-lg`);
    
        // Preenche o input
        await page.fill('#sidra-pesquisa-lg input[placeholder="pesquisar"]', '1209');
    
        // Clica no botao para pesquisar
        await page.click('#sidra-pesquisa-lg button[class="btn btn-default"]')
    
        // Aguarda a pagina carregar
        await page.waitForSelector('.editor-panels');
    
        // Desmarca todos os campos
        await page.locator('button[data-cmd="desmarcarTudo"]').nth(1).click()
        
        // Clica no filtro de 60 anos ou mais
        await page.click('.lv-block .lv-data .item-lista[data-indice="12"] .sidra-check .sidra-toggle');
        await page.click('.lv-block .lv-data .item-lista[data-indice="13"] .sidra-check .sidra-toggle');
        
        // Retira o filtro brasil e coloca estados
        await page.click('#wrapper-arvore #arvore-niveis #arvore-355e-1 .item-arvore .nome-arvore .sidra-check .sidra-toggle');
        await page.click('#wrapper-arvore #arvore-niveis #arvore-435e-1 .item-arvore .nome-arvore .sidra-check .sidra-toggle');
    
        // CLica no botão downloads
        await page.click('#botao-downloads');
    
        // Espera o modal de downloads aparecer
        await page.waitForSelector('#modal-downloads')
    
        // Preenche o nome do arquivo
        await page.fill('#download-form .tabela-opcoes input[placeholder="tabela1209"]', 'populacao_60mais_1209')
        
        // Seleciona o formato do arquivo
        await page.selectOption('#download-form .tabela-opcoes .select-formato-arquivo', { value: 'br.csv' });
    
        // Clica para realizar o download
        await page.click('.div-download-button #opcao-downloads')
    
        // Crio uma constante para armazenar meu download
        const donwload = await page.waitForEvent('download');
    
        // Salvo o mesmo em uma pasta
        await donwload.saveAs('downloads/dados/populacao_60mais_1209.csv');

    } catch (error) {

        console.error("Erro ao executar o teste: ", error);

    }

})