import Clientes from './pages/Clientes';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Placeholder from './pages/Placeholder';

const pages = ['Leads','Clientes','Orçamentos','Ordens de Serviço','Produção','Qualidade','Financeiro','Compras','Estoque','Relatórios','Configurações'];
export default function App(){
 return <Routes><Route element={<Layout/>}><Route path="/" element={<Dashboard/>}/>{pages.map(p=><Route key={p} path={'/'+slug(p)} element={<Placeholder title={p}/>}/>)}</Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>
}
function slug(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,'-');}
