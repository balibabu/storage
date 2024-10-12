export let gitusername = localStorage.getItem('gitusername')
export let gitrepo = localStorage.getItem('gitrepo')
export let gitfilespath = localStorage.getItem('gitfilespath')
export let gitcurrentpath = localStorage.getItem('gitcurrentpath')
export let temp = localStorage.getItem('temp')
export let maxreposize = 20 * 1024 * 1024;


export function setCredentials(values) {
    gitusername = values.gitusername;
    gitrepo = values.gitrepo;
    gitfilespath = values.gitfilespath;
    gitcurrentpath = values.gitcurrentpath;
    temp = values.temp;
    localStorage.setItem('gitusername', gitusername);
    localStorage.setItem('gitrepo', gitrepo);
    localStorage.setItem('gitfilespath', gitfilespath);
    localStorage.setItem('gitcurrentpath', gitcurrentpath);
    localStorage.setItem('temp', temp);
}