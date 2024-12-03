using AutoMapper;

namespace Entity.Mappings
{
    public interface IMapFrom<T>
    {
        void Mapping(Profile profile) => profile.CreateMap(typeof(T), GetType());
    }

    public interface IMapTo<T>
    {
        void Mapping(Profile profile) => profile.CreateMap(GetType(), typeof(T));
    }

    public interface IMapBoth<T>
    {
        void Mapping(Profile profile)
        {
            profile.CreateMap(GetType(), typeof(T)).ReverseMap().IncludeAllDerived();
        }

    }
}