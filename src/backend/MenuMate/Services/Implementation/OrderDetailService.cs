using Entity.Models;
using Entity.ViewModels;
using Repository.Interfaces;
using Services.Interface;

namespace Services.Implementation
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IOrderDetailRepository _repository;
        public OrderDetailService(IOrderDetailRepository repository)
        {
            _repository = repository;
        }

        public async Task<OrderDetail> Add(OrderDetail orderDetail)
        {
            return await _repository.Add(orderDetail);
        }

        public async Task<OrderDetail> Get(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<OrderDetailVM>> GetAllByOrderId(int orderId)
        {
            return await _repository.GetAllByOrderId(orderId);
        }
    }
}
