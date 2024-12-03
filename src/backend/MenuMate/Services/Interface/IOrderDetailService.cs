using Entity.Models;
using Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IOrderDetailService
    {
        Task<OrderDetail> Add(OrderDetail orderDetail);
        Task<OrderDetail> Get(int id);
        Task<IEnumerable<OrderDetailVM>> GetAllByOrderId(int orderId);
    }
}
