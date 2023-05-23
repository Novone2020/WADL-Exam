let btn = document.getElementById('btn')

const multiply = (mat1, mat2, result, row, col) => {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            result[i][j] = mat1[i][j] * mat2[i][j]
        }
    }
};

btn.addEventListener('click',()=>{
    const input1=document.getElementById('input1').value
    const input2=document.getElementById('input2').value
    const table1=document.getElementById('table1')
    const table2=document.getElementById('table2')
    const res=document.getElementById('res')
    let value1=input1.split('#').map(Number)
    let value2=input2.split('#').map(Number)
    let r=''
    let z=''
    let r1=''
    let z1=''

    let row1=value1[0]
    let col1=value1[1]
    let num1=value1[2]

    let row2=value2[0]
    let col2=value2[1]
    let num2=value2[2]

    if((row1!=row2) || (col1!=col2)) return ;
    let mat1=[];
    let mat2=[];

    for(let i=0;i<row1;i++)
    {
        const list=[];
        let num=num1*(i+1);
        r='<tr>';
        for(let j=0;j<col1;j++)
        {
            r+=`<td>${num}</td>`;
            list.push(num)
            num+=(i+1)
        }
        r+='</tr>'
        mat1.push(list);
        z+=r;
    }
    table1.innerHTML=z;


    for(let i=0;i<row2;i++)
    {
        const list=[]
        let num=num2*(i+1)
        r1='<tr>'
        for(let j=0;j<col2;j++)
        {
            r1+=`<td>${num}</td>`;
            list.push(num)
            num+=(i+1)
        }
        r1+='</tr>'
        mat2.push(list)
        z1+=r1;
    }

    table2.innerHTML=z1;
    let result=new Array(row1);
    for(let k=0;k<row1;k++) result[k]=new Array(col1)

    r=''
    z=''

    if(num1==num2)
    {
        for(let i=0;i<row1;i++)
        {
            const list=[]
            let num=num1*(i+1)
            r='<tr>'
            for(let j=0;j<col1;j++)
            {
                r+=`<td>${num}</td>`
                list.push(num)
                num+=(i+1)
            }
            r+='</tr>'
            mat1.push(list)
            z+=r;
        }
        res.innerHTML=z;
    }
    else
    {
        for
    }





})