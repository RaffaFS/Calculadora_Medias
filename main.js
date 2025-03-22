const form = document.getElementById('form-atividade');
const imgAprovado = '<img src= "./images/aprovado.png" alt="emoji festejando" />';
const imgReprovado = '<img src= "./images/reprovado.png" alt="emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima'));

//começo definindo algumas consts, a primeira que capta pelo id o form existente no html, duas que serão preenchidas com push (as vazias),
//uma que será preenchida de acordo com o input do usuário (a notaMinima) e as outras quatro como elementos HTML que serão posteriormente 
//inclusos em códigos flutuantes que por sua vez serão adicionados ao HTML logo em seguida

//veja os exemplos nas pastas de projetos "Agenda C." e "Galeria" para mais informações sobre o funcionamento de string dinâmica

let linhas = ''; //defino let linhas como vazio para que sempre ao abrir a página ela esteja vazia e pronta para acumular informação
                // note que ela está acima e fora do evento, pois se estivesse dentro, ela sempre limparia a linhas ao enviar
                // uma nova linha, substituindo a ultima atividade e nota já existente no html e sendo exibido ao usuário

                // mas o que quero aqui é que ela só esteja limpa no início da operação, depois que mantenha os dados captados

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade') //pega e armazena o input
    const inputNotaAtividade = document.getElementById('nota-atividade') //pega e armazena o input

    if (atividades.includes(inputNomeAtividade.value)) { //o método .includes verifica se o valor do input do usuário já está
                                                        //em um array (se o "nome" já consta em "atividades", nesse caso)
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`); //sendo verdadeiro o alert dessa linha será exibido
                                                                        //note que crio uma string dinâmica aqui com o uso de ``
                                                                        // ao invés de '', faço isso para que possa interpolar
                                                                        //os códigos (inserir valores e elementos de JS diretamente)
    }
    
    else { //não sendo verdadeiro, o código abaixo é executado

        atividades.push(inputNomeAtividade.value); //empurra o para a const matriz o valor do input
        notas.push(parseFloat(inputNotaAtividade.value)); //empurra o para a const matriz o valor do input após torna-lo um número inteiro

        let linha = '<tr>'; 
        linha += `<td>${inputNomeAtividade.value}</td>`; //"linha += elemento;" é o mesmo que "linha = linha + elemento;"
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        linhas += linha;
    }   // O processo que ocorre acima é: crio uma "let linha" e a cada nova linha de código essa let ganha mais um pedacino de código
        // interpolado com `` que será convertido em código html depois.
        // No fim digo que linhas é igual a ela mesma + a nova <tr> criada com seu conteúdo
        // Inicialmente seu valor final será apenas igual a nova <tr>, mas em uma segunda operação ela terá armazenado a primeira
        // <tr> e somará a nova <tr> tendo então uma tabela com duas linhas 

    inputNomeAtividade.value = ''; //limpo o valor das consts já que está tudo armazenado em linhas, e assim o usuário pode adicionar 
    inputNotaAtividade.value = ''; //mais dados e novas linhas nas consts limpas
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); //defino corpoTabela como sendo igual a tbody
    corpoTabela.innerHTML = linhas; //depois substituo o conteúdo de tbody pelo valor da let linhas
}

function calculaMediaFinal() {
    let somaDasNotas = 0; //defino uma let como 0 para usar com valor numérico a seguir

    for (let i = 0; i < notas.length; i++) { //abro um loop com "for", defino a let i como 0 e digo que o loop deve continuar enquanto 
                                            //i for menor que a quantidade de notas (notas.lenght) dentro do array somaDasNotas 
                                            //(que armazenará um após o outro os valores de notas captadas através dessa mesma função)
                                            //no fim com i++ torno o valor de i um número acima, assim alcançará o a quantidade de notas
                                            //em algum momento
        somaDasNotas += notas [i]; //somaDasNotas será igual a ela mesma + a nota que tem o indice igual a i no momento
                                //de início será apenas igual a primeira nota adicionada (indice 0, onde começa o loop)
                                //porém a cada loop as coisas mudam. digamos que já existem 2 notas e eu adiciono uma terceira. O que
                                //acontece aqui dentro é: notas.length agora é = 3, então o loop roda uma vez, fazendo soma ser "a"
                                //já que é igual ao valor dela mesma (0) + o valor do indice atual (0) do array
                                //no fim i++ adiciona 1 a "i" que se torna = 1, ainda sendo menor que 3 o loop roda novamente
                                //agora soma é = a seu valor interno + o valor do indice atual (1) e podemos dizer que soma = "a+b" 
                                //e "i" é = 2 por conta do i++ que novamente adiciona 1. Ainda sendo < 3 o código repete o processo
                                //e agora soma = "a+b+c" e i = 3, o que faz com que o loop tente rodar mais uma vez mas pare porque
                                //a afirmação já não é valida pois agora 3 !< 3. Então somaDasNotas = abc
    }

    return somaDasNotas / notas.length; //aqui eu retorno internamente no código o valor da operação "abc/3"
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); //com essa média eu puxo o valor armazenado por "return" na função acima

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //o método toFixed(2) formata o resultado de
                                                                                //media final para ter apenas duas casas decimais
                                                                                //esse, ´por sua vez é jogado como uma atualização
                                                                                //para o elemento de id 'media-final-valor' através
                                                                                //do innerHTML

    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
    //assim como fez a linha de código acima, essa atualiza o conteúdo de um elemento HTML, mas aqui pergunto se o valor de
    //mediaFinal for >= que notaMínima (decidida pelo usuário logo após carregar a página), se sim (1 opção), deve atualizar com
    //o valor de spanAprovado (const matriz no começo do código), se não (2 opção), com o valor de spanReprovado 
}

form.addEventListener('submit', function(e) { //abertura de função como evento
    e.preventDefault(); 
    adicionaLinha();
    atualizaTabela();
    calculaMediaFinal();
    atualizaMediaFinal();
}) //ao ter o trigger ativado, esse evento executará todas as funções internalizadas nele, uma em seguida da outra.
    //é importante que elas estejam na ordem correta de funcionamento, passo a passo assim como é também importante que
    //aqui no script o evento esteja acima de todas as funções que irá chamar

